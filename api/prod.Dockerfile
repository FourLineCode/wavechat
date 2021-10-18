# Production Environment
FROM node:16-alpine AS production

# Default work directory for the container
WORKDIR /api

# Install curl to download pnpm
RUN apk --no-cache add curl

# Install pnpm in the container
RUN curl -f https://get.pnpm.io/v6.16.js | node - add --global pnpm

# Sets all the environment variables for development server
ENV NODE_ENV=production
ENV PORT=5000
ENV DATABASE_URL=postgresql://postgres:pgadmin@postgres-prod:5432/wavechat?schema=public
ENV ADMIN_PASS=admin00
ENV BOT_PASS=adminpp
ENV JWT_SECRET=verysecretkey

# Copy all the local files to the container (includes node_modules for development mode)
COPY . .

# Delete ignored files/folders
RUN rm -rf node_modules
RUN rm -rf dist
RUN rm -rf Dockerfile
RUN rm -rf prod.Dockerfile

# Install and cache the dependencies
RUN pnpm install --prod=false

# Generated PrismaClient on build
RUN pnpm prisma generate

# Expose the local ports on the host machine
EXPOSE 5000
EXPOSE 5001

# Start the API
CMD [ "pnpm", "prod" ]