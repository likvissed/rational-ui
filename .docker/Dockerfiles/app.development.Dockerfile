ARG NODE_MAJOR
FROM docker-hub.***REMOVED***.ru/registry/languages/nodejs/node:${NODE_MAJOR}-buster-slim

ARG APP_ROOT
ARG NG_CLI_VERSION

# Install angular-cli
RUN yarn global add @angular/cli@${NG_CLI_VERSION} && \
    ng config -g cli.packageManager yarn && \
    echo "cd ${APP_ROOT}" >> /root/.profile

# Create app folder
RUN mkdir -p ${APP_ROOT}
WORKDIR ${APP_ROOT}

EXPOSE 4200

STOPSIGNAL SIGTERM
