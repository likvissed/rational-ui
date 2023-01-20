ARG NODE_MAJOR
FROM docker-hub.***REMOVED***.ru/registry/languages/nodejs/node:${NODE_MAJOR}-buster-slim AS builder

ARG ENVIRONMENT
ARG APP_ROOT
ARG NG_CLI_VERSION
WORKDIR ${APP_ROOT}

# Install angular-cli
RUN yarn global add @angular/cli@${NG_CLI_VERSION}

COPY package.json yarn.lock ./
RUN yarn

COPY . .
RUN yarn run build --configuration=${ENVIRONMENT}

# Deploy
FROM docker-hub-proxy.***REMOVED***.ru/nginx:1.23.3-alpine
ARG APP_HOSTNAME

COPY ./.docker/tls/ /etc/pki/tls/nginx/
COPY .docker/nginx/nginx.conf /tmp/nginx.conf
RUN envsubst '${APP_HOSTNAME}' < /tmp/nginx.conf > /etc/nginx/conf.d/nginx.conf

COPY --from=builder /app/dist/project-name /app/public

EXPOSE 80
EXPOSE 443

STOPSIGNAL SIGTERM
