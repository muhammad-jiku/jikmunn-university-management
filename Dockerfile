# syntax=docker/dockerfile:1

# Comments are provided throughout this file to help you get started.
# If you need more help, visit the Dockerfile reference guide at
# https://docs.docker.com/go/dockerfile-reference/

# Want to help us make this template better? Share your feedback here: https://forms.gle/ybq9Krt8jtBL3iCk7

ARG NODE_VERSION=20.11.0

FROM node:${NODE_VERSION}-alpine

# Set the working directory inside the container.
WORKDIR /app

# Copy package files
COPY package.json yarn.lock ./

# Install all dependencies (including dev dependencies needed for build)
RUN yarn install --frozen-lockfile

# Copy the rest of the source files into the image.
COPY . .

# Build the TypeScript application
RUN yarn build

# Download dependencies as a separate step to take advantage of Docker's caching.
# Leverage a cache mount to /root/.yarn to speed up subsequent builds.
# Leverage a bind mounts to package.json and yarn.lock to avoid having to copy them into
# into this layer.
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=yarn.lock,target=yarn.lock \
    --mount=type=cache,target=/root/.yarn \
    yarn install --production --frozen-lockfile && yarn cache clean

# before chmod +x entrypoint.sh
RUN apk add --no-cache bash

# Make the entrypoint script executable 
RUN chmod +x ./entrypoint.sh

# Create the log dirs and chown them to `node`
RUN mkdir -p /app/logs/winston/successes /app/logs/winston/errors \
 && chown -R node:node /app/logs

# Use production node environment by default.
ENV NODE_ENV=production

# Run the application as a non-root user.
USER node

# Expose the port that the application listens on.
EXPOSE 5000

# Run the application 
# Make the entrypoint script executable and set it as entrypoint
ENTRYPOINT ["./entrypoint.sh"]
