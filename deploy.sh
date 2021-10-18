#!/usr/bin/env bash

docker-compose -f docker-compose.prod.yml down --volumes
docker-compose -f docker-compose.prod.yml build
docker-compose -f docker-compose.prod.yml up --no-start

docker-compose -f docker-compose.prod.yml start postgres-prod
pnpm --dir api prod:db:reset
docker-compose -f docker-compose.prod.yml stop postgres-prod

docker-compose -f docker-compose.prod.yml up --scale api-prod=3