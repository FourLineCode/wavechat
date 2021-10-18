#!/usr/bin/env bash

docker-compose down --volumes
if [ "$1" == "build" ]; then
	docker-compose up --build --no-start --remove-orphans
else
	docker-compose up --no-start --remove-orphans
fi

docker-compose start postgres
pnpm --dir api db:reset
docker-compose stop postgres

docker-compose up