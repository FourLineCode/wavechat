# Production Environment
FROM node:16-alpine AS production

# Default work directory for the container
WORKDIR /web

# Install curl to download pnpm
RUN apk --no-cache add curl

# Install pnpm in the container
RUN curl -f https://get.pnpm.io/v6.16.js | node - add --global pnpm

# Copy all the local files to the container (includes node_modules for development mode)
COPY . .

# Delete ignored files/folders
RUN rm -rf node_modules
RUN rm -rf .next
RUN rm -rf Dockerfile
RUN rm -rf prod.Dockerfile

# Install and cache the dependencies
RUN pnpm install

# Expose the local ports on the host machine
EXPOSE 3000

# Start the API
CMD [ "pnpm", "prod" ]