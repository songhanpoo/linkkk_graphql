FROM node:14.15.4-alpine3.10 AS base

RUN apk update && apk upgrade && \
    apk add --no-cache git && apk add bash
# ENV VUE_APP_TVRATING_API_DOMAIN_ENV tvrating-dev.dev
# ENV VUE_APP_TVRATING_API_PORT_ENV 80
# make the 'app' folder the current working directory
WORKDIR /app
# copy both 'package.json' and 'package-lock.json' (if available)
COPY package*.json ./
RUN yarn
ONBUILD ADD . .
FROM base AS dev
RUN apk add --no-cache bash curl busybox-extras
CMD ["yarn","dev"]

FROM base AS builder
RUN yarn run build
FROM nginx:1.16.0-alpine as prod
RUN rm  /usr/share/nginx/html/*
COPY --from=builder /app/dist /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d
EXPOSE 8080
CMD ["nginx","-g","daemon off;"]
