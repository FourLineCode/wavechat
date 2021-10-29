# Production Environment
FROM node:16-alpine AS production

# Default work directory for the container
WORKDIR /rtc

# Install curl to download pnpm
RUN apk --no-cache add curl

# Install pnpm in the container
RUN curl -f https://get.pnpm.io/v6.16.js | node - add --global pnpm

# Sets all the environment variables for development server
ENV NODE_ENV=production
ENV PORT=8000
ENV REDIS_PORT=6379
ENV REDIS_HOST=wcp-redis
ENV INTERNAL_SECRET=internalsecretkey

# Install dependencies
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --prod=false

# Copy all the local files to the container
COPY . .

# Expose the local ports on the host machine
EXPOSE 8000
EXPOSE 8001

# Start the API
CMD [ "pnpm", "prod" ]