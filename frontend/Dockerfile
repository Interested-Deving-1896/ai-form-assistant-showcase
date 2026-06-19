ARG APP_ROOT=/opt/app-root/src
ARG BASE_IMAGE=docker.io/node:22.19.0-alpine
ARG RUNTIME_IMAGE=docker.io/nginxinc/nginx-unprivileged:1.27-alpine

#
# Build the frontend (Vite -> ./dist)
#
FROM ${BASE_IMAGE} AS build

ARG APP_ROOT
ENV NO_UPDATE_NOTIFIER=true

# NPM Permission Fix
RUN mkdir -p /.npm && chown -R 1001:0 /.npm

COPY . ${APP_ROOT}
RUN chown -R 1001:0 ${APP_ROOT}
USER 1001
WORKDIR ${APP_ROOT}
RUN npm ci && npm run build

#
# Final runtime image: serve the static SPA on :8080 as a non-root user
#
FROM ${RUNTIME_IMAGE}

ARG APP_ROOT

# Backend origin the SPA proxies /api and /config to. Override per environment
# (e.g. http://aifas-app:8080 on OpenShift, http://app:8080 in docker compose).
ENV BACKEND_ORIGIN=http://app:8080

# nginx-unprivileged already runs as uid 101 and listens on 8080.
COPY --from=build ${APP_ROOT}/dist /usr/share/nginx/html
# Rendered to /etc/nginx/conf.d/default.conf at startup by the envsubst entrypoint.
COPY default.conf.template /etc/nginx/templates/default.conf.template

EXPOSE 8080
