#!/usr/bin/env bash

rm -rf api/node_modules
rm -rf rtc/node_modules
rm -rf web/node_modules
rm -rf api/dist
rm -rf rtc/dist
rm -rf web/.next

if [[ "$1" == "--reset" ]]
then
	rm api/pnpm-lock.yaml
	rm rtc/pnpm-lock.yaml
	rm web/pnpm-lock.yaml
fi

docker-compose down --volumes --remove-orphans
docker-compose -f docker-compose.prod.yml down --volumes --remove-orphans

pnpm --dir api install
pnpm --dir rtc install
pnpm --dir web install