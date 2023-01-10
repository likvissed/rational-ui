#!/bin/bash -xe
export COMPOSE_DOCKER_CLI_BUILD=1 DOCKER_BUILDKIT=1

docker-compose -f "docker-compose.development.yml" -p rational-ui--development down --remove-orphans
# docker volume rm rational-ui--development_node_modules
docker-compose -f "docker-compose.development.yml" -p rational-ui--development build
docker-compose -f "docker-compose.development.yml" -p rational-ui--development up -d
