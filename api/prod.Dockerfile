# Production Environment
FROM node:16-alpine AS production

# Default work directory for the container
WORKDIR /api

# Install curl to download pnpm
RUN apk --no-cache add curl

# Install pnpm in the container
RUN curl -f https://get.pnpm.io/v6.14.js | node - add --global pnpm
RUN pnpm add -g pnpm

# Sets all the environment variables for development server
ENV NODE_ENV=production
ENV PORT=5000
ENV DATABASE_URL=postgresql://postgres:pgadmin@postgres-prod:5432/wavechat?schema=public
ENV ADMIN_PASS=admin00
ENV BOT_PASS=adminpp
ENV JWT_SECRET=verysecretkey

# Copy the dependency files
COPY package.json pnpm-lock.yaml ./

# Install and cache the dependencies
RUN pnpm install

# Copy all the local files to the container (includes node_modules for development mode)
COPY . .

# Migrates the database and generated PrismaClient on build
RUN pnpm prisma generate

# Expose the local ports on the host machine
EXPOSE 5000
EXPOSE 5001

# Start the API
CMD [ "pnpm", "prod" ]