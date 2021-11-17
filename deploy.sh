#!/usr/bin/env bash

replica_count=2

docker-compose -f docker-compose.prod.yml down --volumes
docker-compose -f docker-compose.prod.yml build
docker-compose -f docker-compose.prod.yml up --no-start

docker-compose -f docker-compose.prod.yml start wcp-postgres
sleep 10 && pnpm --dir api prod:db:reset
docker-compose -f docker-compose.prod.yml stop wcp-postgres

docker-compose -f docker-compose.prod.yml up --scale wcp-api=$replica_count --scale wcp-rtc=$replica_count