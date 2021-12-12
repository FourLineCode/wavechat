# Development Environment
FROM node:16-alpine AS development

COPY . ./app
WORKDIR /app/api

RUN npm install -g pnpm

ENV NODE_ENV=development
ENV PORT=5000
ENV DATABASE_URL=postgresql://postgres:pgadmin@postgres:5432/wavechat?schema=public
ENV ADMIN_PASS=admin00
ENV BOT_PASS=adminpp
ENV JWT_SECRET=verysecretkey
ENV INTERNAL_SECRET=internalsecretkey
ENV REDIS_PORT=6379
ENV REDIS_HOST=redis
ENV AWS_ACCESS_KEY_ID=aws-access-key
ENV AWS_SECRET_KEY=aws-secret-key
ENV AWS_BUCKET_NAME=wc-media

RUN pnpm install --prod=false
RUN pnpm prisma generate

EXPOSE 5000
EXPOSE 5001

CMD [ "pnpm", "dev" ]

# ===========================================================

FROM node:16-alpine AS production

COPY . ./app
WORKDIR /app/api

RUN npm install -g pnpm

ENV NODE_ENV=production
ENV PORT=5000
ENV DATABASE_URL=postgresql://postgres:pgadmin@wcp-postgres:5432/wavechat?schema=public
ENV ADMIN_PASS=admin00
ENV BOT_PASS=adminpp
ENV JWT_SECRET=verysecretkey
ENV INTERNAL_SECRET=internalsecretkey
ENV REDIS_PORT=6379
ENV REDIS_HOST=wcp-redis
ENV AWS_ACCESS_KEY_ID=aws-access-key
ENV AWS_SECRET_KEY=aws-secret-key
ENV AWS_BUCKET_NAME=wc-media

RUN pnpm install --prod=false
RUN pnpm prisma generate

EXPOSE 5000
EXPOSE 5001

CMD [ "pnpm", "prod" ]