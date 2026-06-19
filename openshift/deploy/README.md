# AIFAS Deployment — TEST namespace (`1dca6b-test`)

Deploys the two AIFAS images to OpenShift using the **`:test`** ImageStream tags
promoted into `1dca6b-tools` (see `../README.md` for how those tags are built and
promoted). The frontend is the single external entrypoint; it proxies `/api` and
`/config` to the backend over the in-cluster network.

```
Internet ──HTTPS──▶ Route (aifas-frontend)
                       │
                       ▼
              Service aifas-frontend:8080  ──▶  nginx SPA pod
                                                   │  /api, /config  (BACKEND_ORIGIN)
                                                   ▼
                                        Service aifas-app:8080 ──▶ Express pod
                                                                      │ env
                                                                      ▼
                                                              ConfigMap aifas-config
```

## Files

| File                   | Objects                                              | Image pulled                       |
| ---------------------- | ---------------------------------------------------- | ---------------------------------- |
| `configmap.test.yaml`  | `ConfigMap aifas-config` (backend env, served to SPA via `/config`) | —                  |
| `app.deploy.yaml`      | `Deployment` + `Service` `aifas-app`                 | `1dca6b-tools/aifas-app:test`      |
| `frontend.deploy.yaml` | `Deployment` + `Service` + `Route` `aifas-frontend`  | `1dca6b-tools/aifas-frontend:test` |

## Prerequisites

- The `:test` tags exist in `1dca6b-tools` (`oc get istag -n 1dca6b-tools | findstr test`).
- You are logged in and targeting the cluster (`oc whoami`, `oc project 1dca6b-test`).

## 1. Allow cross-namespace image pull (one-time)

The Deployments pull from `1dca6b-tools`, so the **test** namespace service accounts
need pull access. Without this, pods fail with `ImagePullBackOff`.

```powershell
oc policy add-role-to-group system:image-puller `
  system:serviceaccounts:1dca6b-test -n 1dca6b-tools
```

## 2. Apply the manifests

Run from this `openshift/deploy/` folder:

```powershell
oc apply -f .\configmap.test.yaml  -n 1dca6b-test
oc apply -f .\app.deploy.yaml      -n 1dca6b-test
oc apply -f .\frontend.deploy.yaml -n 1dca6b-test
```

## 3. Verify the rollout and get the URL

```powershell
oc rollout status deploy/aifas-app      -n 1dca6b-test
oc rollout status deploy/aifas-frontend -n 1dca6b-test
oc get pods,svc,route -n 1dca6b-test
oc get route aifas-frontend -n 1dca6b-test
```

Open the Route host over HTTPS. The frontend serves the SPA; `/api` and `/config`
are proxied to the backend.

## How redeploys work

Each Deployment has an `image.openshift.io/triggers` annotation pointing at its
`:test` ImageStreamTag in `1dca6b-tools`. When you re-promote the tag, OpenShift
rolls the Deployment automatically:

```powershell
# promote a newer build into :test, then the Deployment redeploys on its own
oc tag 1dca6b-tools/aifas-app:dev      1dca6b-tools/aifas-app:test      -n 1dca6b-tools
oc tag 1dca6b-tools/aifas-frontend:dev 1dca6b-tools/aifas-frontend:test -n 1dca6b-tools
```

To force a manual redeploy without a new image:

```powershell
oc rollout restart deploy/aifas-app      -n 1dca6b-test
oc rollout restart deploy/aifas-frontend -n 1dca6b-test
```

## Changing the Orchestrator URL after deploy

`ORCHESTRATOR_API_URL` is **parameterized via the `aifas-config` ConfigMap** (not baked
into the image or the Deployment). The frontend reads it through `configMapKeyRef` and
serves it to the embedded `client.js` at `/aifas-client-scripts/config.js`.

To change it on a running deployment — no rebuild, no re-tag:

```powershell
# 1. Update the value in the ConfigMap
oc set data configmap/aifas-config ORCHESTRATOR_API_URL=https://new-orchestrator/invoke -n 1dca6b-test

# 2. Restart the frontend so the new pod picks it up
oc rollout restart deploy/aifas-frontend -n 1dca6b-test

# 3. Verify the served config reflects the new value
oc rollout status deploy/aifas-frontend -n 1dca6b-test
curl -s https://<route-host>/aifas-client-scripts/config.js
```

> ConfigMap env vars are read **only at pod startup** — editing the ConfigMap does NOT
> update running pods. The `oc rollout restart` in step 2 is required for the change to
> take effect.

## Design notes

- **Single external Route → frontend only.** The backend has no Route; it is reached
  in-cluster at `http://aifas-app:8080`. The frontend's `BACKEND_ORIGIN` env var
  points there (set in `frontend.deploy.yaml`).
- **Restricted-SCC ready.** No fixed `runAsUser` (OpenShift assigns the namespace
  UID), `runAsNonRoot: true`, all capabilities dropped, `seccompProfile:
  RuntimeDefault`.
- **Health checks.** Backend probes `GET /api`; frontend probes `GET /`.
- **Resources.** Modest test-sized requests/limits and `replicas: 1`. Bump
  `replicas` (and add an HPA) for higher environments.

## Things to confirm before/after deploy

1. **`SERVER_OIDC_SERVERURL` typo.** `.github/environments/values.test.yaml` has
   `https://dtestev.loginproxy.gov.bc.ca/auth`, which would break JWT issuer
   verification. The ConfigMap uses the corrected
   `https://test.loginproxy.gov.bc.ca/auth`. Revert if `dtestev` is intentional.

2. **OIDC redirect URI.** After you have the Route host, the Keycloak client
   `ai-form-assistant-showcase-6180` (TEST realm) must register:
   - **Valid redirect URI:** `https://<route-host>/oidc/callback`
   - **Valid post logout redirect URI:** `https://<route-host>/oidc/logout`
   - **Web origin:** `https://<route-host>`

   Otherwise login fails right after the OIDC discovery step.

3. **Pin the Route host (optional).** `frontend.deploy.yaml` omits `host` so
   OpenShift generates one. Uncomment the `host:` line to pin a fixed hostname
   (do this before registering the redirect URIs above).
