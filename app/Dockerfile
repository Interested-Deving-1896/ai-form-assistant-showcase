ARG APP_ROOT=/opt/app-root/src
ARG BASE_IMAGE=docker.io/node:22.19.0-alpine

#
# Build the backend (TypeScript -> ./sbin)
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
# Final runtime image
#
FROM ${BASE_IMAGE}

ARG APP_ROOT
ENV APP_PORT=8080 \
    NO_UPDATE_NOTIFIER=true

# NPM Permission Fix
RUN mkdir -p /.npm && chown -R 1001:0 /.npm

# Install File Structure
COPY --from=build ${APP_ROOT}/sbin ${APP_ROOT}/sbin
COPY config ${APP_ROOT}/config
COPY config ${APP_ROOT}/sbin/config
COPY package.json package-lock.json ${APP_ROOT}/
WORKDIR ${APP_ROOT}

# Install production dependencies only
RUN chown -R 1001:0 ${APP_ROOT}
USER 1001
RUN npm ci --omit=dev

EXPOSE ${APP_PORT}
CMD ["node", "./sbin/server.js"]
