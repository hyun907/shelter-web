FROM node:20-alpine AS builder
WORKDIR /app

# Install dependencies
COPY package.json pnpm-lock.yaml ./
RUN corepack enable \
  && corepack prepare pnpm@9.12.0 --activate \
  && pnpm install --frozen-lockfile

# Copy sources
COPY . .

# Build-time env injection for Vite
ARG VITE_API_BASE_URL
ARG VITE_MEMBER_API_URL
ARG VITE_GOOGLE_MAPS_API_KEY
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL \
    VITE_MEMBER_API_URL=$VITE_MEMBER_API_URL \
    VITE_GOOGLE_MAPS_API_KEY=$VITE_GOOGLE_MAPS_API_KEY

# Build static assets
RUN pnpm build

# ---- Serve stage ----
FROM nginx:1.27-alpine

# Nginx config for SPA fallback and static caching
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Static files
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

# Note: Health checks should be defined in Kubernetes probes


