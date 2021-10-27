#!/usr/bin/env bash

pnpm --dir api install
pnpm --dir rtc install
pnpm --dir web install

if [[ "$1" != "--no-reset" ]]
then
	docker-compose down --volumes
fi

if [[ "$1" == "--build" ]]
then
	docker-compose up --build --no-start --remove-orphans
else
	docker-compose up --no-start --remove-orphans
fi

if [[ "$1" != "--no-reset" ]]
then
	docker-compose start postgres
	pnpm --dir api db:reset
	docker-compose stop postgres
fi

docker-compose up