# syntax = docker/dockerfile:1

# Adjust NODE_VERSION as desired
ARG NODE_VERSION=21.6.0
FROM node:${NODE_VERSION}-slim

# Remix app lives here
WORKDIR /app

# Set production environment
ENV NODE_ENV="production"

# Install pnpm
ARG PNPM_VERSION=9.1.3
RUN npm install -g pnpm@$PNPM_VERSION

# Install packages needed to build node modules
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y build-essential node-gyp pkg-config python-is-python3

# Install node modules
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile --prod=false

# Copy application code
COPY static static
COPY src src
COPY tsconfig.json tsconfig.json
COPY vite.config.ts vite.config.ts
COPY svelte.config.js svelte.config.js

RUN pnpm run build

CMD [ "pnpm", "run", "start" ]
