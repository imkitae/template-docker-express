FROM node:12.16.1-alpine3.11 as builder

ARG ENVIRONMENT

COPY package.json yarn.lock webpack.config.js babel.config.js /
COPY src ./src

RUN yarn --pure-lockfile \
&& yarn build



FROM node:12.16.1-alpine3.11

RUN mkdir /app
WORKDIR /app

RUN apk add --no-cache --virtual .build-deps \
    tzdata \
    && apk add --no-cache \
        nginx \
        supervisor \
    && TZ=${TZ:-Asia/Seoul} \
    && cp /usr/share/zoneinfo/${TZ} /etc/localtime \
    && echo ${TZ} > /etc/timezone \
&& apk del .build-deps \
&& rm -rf /var/cache/apk/*

RUN mkdir -p /app \
&& ln -sf /dev/stdout /var/log/nginx/access.log \
&& ln -sf /dev/stderr /var/log/nginx/error.log

EXPOSE 80
COPY docker/docker-entrypoint.sh /usr/local/bin/docker-entrypoint
ENTRYPOINT ["docker-entrypoint"]
CMD ["supervisord", "-c", "/etc/supervisor/supervisord.conf", "-n"]

COPY docker/supervisor /etc/supervisor
COPY docker/nginx /etc/nginx

COPY --from=builder /node_modules ./node_modules
COPY --from=builder /dist /static

COPY package.json webpack.config.js babel.config.js ./
COPY src ./src
