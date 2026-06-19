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

> [!IMPORTANT]
> These `.yaml` files are OpenShift **Templates**. `oc apply -f app.bc.yaml` only
> stores the Template object — it does **not** create the BuildConfig/ImageStream.
> You must `oc process` first, then pipe to `oc apply`. (Commands below are
> PowerShell; on bash use `$TOOLS` instead of `1dca6b-tools` inline.)

## 1. Create the builds + imagestreams (tools namespace)

```powershell
# Run from the openshift/ folder. Defaults to the dev-AA-clientjs branch;
# add -p SOURCE_GIT_REF=<branch/tag> to override.
oc process -f .\app.bc.yaml | oc apply -n 1dca6b-tools -f -
oc process -f .\frontend.bc.yaml | oc apply -n 1dca6b-tools -f -
```

Verify the objects were created (not just a stored Template):

```powershell
oc get bc,is -n 1dca6b-tools
```

## 2. Run a build

```powershell
oc start-build aifas-app -n 1dca6b-tools --follow
oc start-build aifas-frontend -n 1dca6b-tools --follow
```

## 3. Promote across environments (creates the dev/test/prod tags)

Run `oc tag` only **after** a successful build, so `:latest` exists. Each command
copies the current image to the next tag (a static snapshot — it does not move on
later builds).

```powershell
# --- dev (promote latest -> dev) ---
oc tag 1dca6b-tools/aifas-app:latest 1dca6b-tools/aifas-app:dev -n 1dca6b-tools
oc tag 1dca6b-tools/aifas-frontend:latest 1dca6b-tools/aifas-frontend:dev -n 1dca6b-tools

# --- test (promote dev -> test) ---
oc tag 1dca6b-tools/aifas-app:dev 1dca6b-tools/aifas-app:test -n 1dca6b-tools
oc tag 1dca6b-tools/aifas-frontend:dev 1dca6b-tools/aifas-frontend:test -n 1dca6b-tools

# --- prod (promote test -> prod) ---
oc tag 1dca6b-tools/aifas-app:test 1dca6b-tools/aifas-app:prod -n 1dca6b-tools
oc tag 1dca6b-tools/aifas-frontend:test 1dca6b-tools/aifas-frontend:prod -n 1dca6b-tools
```

Confirm the tags:

```powershell
oc describe is aifas-app -n 1dca6b-tools
oc get istag -n 1dca6b-tools | findstr "dev test prod"
```

> Add `--alias=true` to an `oc tag` if you want that tag to **track** `latest`
> automatically on every new build instead of being a static snapshot. The default
> (no flag) is the static promotion most BC Gov flows want.

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
- If you accidentally ran `oc apply -f *.bc.yaml` directly, it created stored
  Template objects. Remove them with:
  `oc delete template aifas-app-build aifas-frontend-build -n 1dca6b-tools`
