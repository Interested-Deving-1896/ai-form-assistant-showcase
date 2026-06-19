# OpenShift Builds & ImageStreams

BuildConfigs and ImageStreams for the two AIFAS images:

| Component  | Source dir  | Template              | ImageStream     | Dockerfile          |
| ---------- | ----------- | --------------------- | --------------- | ------------------- |
| Frontend   | `frontend/` | `frontend.bc.yaml`    | `aifas-frontend`| `frontend/Dockerfile` |
| Backend    | `app/`      | `app.bc.yaml`         | `aifas-app`     | `app/Dockerfile`    |

Both use the **Docker build strategy** against their `contextDir`, and push to the
`:latest` tag of their ImageStream in the **tools** namespace. Each environment
(`dev` / `test` / `prod`) is then a *promotion tag* on the same ImageStream — the
exact image built once is re-tagged forward, so what runs in prod is bit-for-bit
what was tested.

```
build -> aifas-frontend:latest --oc tag--> :dev --oc tag--> :test --oc tag--> :prod
build -> aifas-app:latest      --oc tag--> :dev --oc tag--> :test --oc tag--> :prod
```

> Namespace prefix below is `1dca6b` (from `.github/workflows/on-push.yaml`).
> Builds live in `1dca6b-tools`; adjust if yours differs.

## 1. Create the builds + imagestreams (tools namespace)

```bash
TOOLS=1dca6b-tools

# Frontend (defaults to main; pass SOURCE_GIT_REF=<branch/tag> to override)
oc process -f openshift/frontend.bc.yaml \
  -p SOURCE_GIT_REF=main | oc apply -n "$TOOLS" -f -

# Backend
oc process -f openshift/app.bc.yaml \
  -p SOURCE_GIT_REF=main | oc apply -n "$TOOLS" -f -
```

## 2. Run a build

```bash
TOOLS=1dca6b-tools
oc start-build aifas-frontend -n "$TOOLS" --follow
oc start-build aifas-app      -n "$TOOLS" --follow
```

## 3. Promote across environments (creates the dev/test/prod tags)

```bash
TOOLS=1dca6b-tools

# Frontend
oc tag "$TOOLS/aifas-frontend:latest" "$TOOLS/aifas-frontend:dev"  -n "$TOOLS"
oc tag "$TOOLS/aifas-frontend:dev"    "$TOOLS/aifas-frontend:test" -n "$TOOLS"
oc tag "$TOOLS/aifas-frontend:test"   "$TOOLS/aifas-frontend:prod" -n "$TOOLS"

# Backend
oc tag "$TOOLS/aifas-app:latest" "$TOOLS/aifas-app:dev"  -n "$TOOLS"
oc tag "$TOOLS/aifas-app:dev"    "$TOOLS/aifas-app:test" -n "$TOOLS"
oc tag "$TOOLS/aifas-app:test"   "$TOOLS/aifas-app:prod" -n "$TOOLS"
```

Deployments in the env namespaces (`1dca6b-dev`, `1dca6b-test`, `1dca6b-prod`)
reference the matching tag, e.g.:

```
image-registry.openshift-image-registry.svc:5000/1dca6b-tools/aifas-frontend:dev
image-registry.openshift-image-registry.svc:5000/1dca6b-tools/aifas-app:dev
```

> Grant each env namespace's default service account pull access to the tools
> namespace if not already done:
> `oc policy add-role-to-group system:image-puller system:serviceaccounts:1dca6b-dev -n 1dca6b-tools`

## Notes

- The build no longer produces the single combined image (`Dockerfile` at repo
  root). The frontend is served as a static SPA by `nginx-unprivileged` on `:8080`;
  the backend serves the API on `:8080`. The frontend image proxies `/api` and
  `/config` to the backend via the `BACKEND_ORIGIN` env var (default
  `http://app:8080`) — set it on the frontend Deployment, e.g.
  `BACKEND_ORIGIN=http://aifas-app:8080`.
- Tag-based deploys: add an `ImageChange` trigger on the env Deployment, or
  re-`oc tag` to roll forward.
