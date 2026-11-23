FROM node:16-bullseye AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
ARG VUE_APP_BACK_URL
ARG VUE_APP_MEDIA_URL
RUN for v in VUE_APP_BACK_URL VUE_APP_MEDIA_URL; do \
      eval "val=\$$v"; [ -z "$val" ] || echo "$v=$val" >> .env.local; \
    done \
 && npm run build

FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
