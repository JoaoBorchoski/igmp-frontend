# --- build stage ---
FROM node:18-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
# Angular 14 + PO-UI lockfile resolves with legacy peer-dep behavior
RUN npm ci --legacy-peer-deps
COPY . .
RUN npm run build

# --- serve stage ---
FROM nginx:alpine
# nginx config is a template so we can bind to the Railway-injected $PORT at boot
COPY nginx.conf.template /etc/nginx/conf.d/default.conf.template
COPY --from=build /app/dist/igmp /usr/share/nginx/html
ENV PORT=8080
EXPOSE 8080
# Substitute only $PORT (keep nginx's own $uri etc. intact), then run nginx
CMD ["sh", "-c", "envsubst '$PORT' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf && exec nginx -g 'daemon off;'"]
