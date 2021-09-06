FROM node:16

WORKDIR /web

RUN curl -f https://get.pnpm.io/v6.14.js | node - add --global pnpm

COPY . .

EXPOSE 3000