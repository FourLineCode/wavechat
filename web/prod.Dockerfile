# Production Environment
FROM node:16-alpine AS production

# Default work directory for the container
WORKDIR /web

# Install curl to download pnpm
RUN apk --no-cache add curl

# Install pnpm in the container
RUN curl -f https://get.pnpm.io/v6.14.js | node - add --global pnpm
RUN pnpm add -g pnpm

# Copy the dependency files
COPY package.json pnpm-lock.yaml ./

# Install and cache the dependencies
RUN pnpm install

# Copy all the local files to the container (includes node_modules for development mode)
COPY . .

# Expose the local ports on the host machine
EXPOSE 3000

# Start the API
CMD [ "pnpm", "prod" ]