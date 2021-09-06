FROM node:16

WORKDIR /api

RUN curl -f https://get.pnpm.io/v6.14.js | node - add --global pnpm

ENV NODE_ENV=development
ENV PORT=5000
ENV DATABASE_URL=postgresql://postgres:pgadmin@postgres:5432/wavechat?schema=public
ENV ADMIN_PASS=admin00
ENV BOT_PASS=adminpp
ENV JWT_SECRET=verysecretkey

COPY . .

EXPOSE 5000