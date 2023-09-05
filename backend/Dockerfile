# syntax=docker/dockerfile:1

FROM node:18.17.1-bullseye-slim

# https://github.com/Yelp/dumb-init
RUN apt-get update && apt-get install -y --no-install-recommends dumb-init

ENV NODE_ENV production
WORKDIR /usr/src
COPY --chown=node:node . .
RUN npm ci --only=production
USER node
CMD ["dumb-init", "node", "index.js"]