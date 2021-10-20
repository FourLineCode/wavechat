# Development Environment
FROM node:16-alpine AS development

# Default work directory for the container
WORKDIR /web

# Install curl to download pnpm
RUN apk --no-cache add curl

# Install pnpm in the container
RUN curl -f https://get.pnpm.io/v6.16.js | node - add --global pnpm

# Install dependencies
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --prod=false

# Copy all the local files to the container
COPY . .

# Expose the local ports on the host machine
EXPOSE 3000

# Start the API
CMD [ "pnpm", "dev" ]