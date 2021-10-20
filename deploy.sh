#!/usr/bin/env bash

docker-compose -f docker-compose.prod.yml down --volumes
docker-compose -f docker-compose.prod.yml build
docker-compose -f docker-compose.prod.yml up --no-start

docker-compose -f docker-compose.prod.yml start wcp-postgres
pnpm --dir api prod:db:reset
docker-compose -f docker-compose.prod.yml stop wcp-postgres

docker-compose -f docker-compose.prod.yml up --scale wcp-api=3