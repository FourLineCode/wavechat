#!/usr/bin/env bash

rm -rf api/@shared
rm -rf rtc/@shared
rm -rf web/@shared

cp -r @shared api
cp -r @shared rtc
cp -r @shared web

echo "Sync Done: All @shared folders are in sync between repos"