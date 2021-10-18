#!/usr/bin/env bash

docker-compose down --volumes
docker-compose up --no-start

docker-compose start postgres
pnpm --dir api db:reset
docker-compose stop postgres

docker-compose up --remove-orphans