#!/usr/bin/env bash


docker-compose -f docker-compose.prod.yml down --volumes
docker-compose -f docker-compose.prod.yml up --build --scale api-prod=3