# OSS Health Checker — Frontend image
#
# Multi-stage: build the Vite/React app, then serve the static bundle with
# nginx. The backend base URL is baked in at build time (Vite inlines
# import.meta.env), defaulting to the host-mapped backend port.

FROM node:22-alpine AS build
WORKDIR /app

COPY package*.json ./
# `npm install` (not `npm ci`): the committed package-lock.json is generated
# on macOS and omits Linux/wasm platform-specific optional deps (e.g.
# @emnapi/*), which makes `npm ci` fail inside this linux image. `npm install`
# resolves the correct platform deps at build time.
RUN npm install --no-audit --no-fund

COPY . .

# The browser (running on the host) reaches the backend via its published
# port, so this is a host URL, not a compose service name.
ARG VITE_API_BASE_URL=http://localhost:8000
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
