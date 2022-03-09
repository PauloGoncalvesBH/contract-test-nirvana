FROM node:lts-alpine3.12

RUN apk --no-cache add git ca-certificates=20211220-r0 wget=1.20.3-r1 bash=5.0.17-r0 \
  && wget -q -O /etc/apk/keys/sgerrand.rsa.pub https://alpine-pkgs.sgerrand.com/sgerrand.rsa.pub \
  && wget -q https://github.com/sgerrand/alpine-pkg-glibc/releases/download/2.29-r0/glibc-2.29-r0.apk \
  && apk --no-cache add glibc-2.29-r0.apk \
  && rm -rf /var/cache/apk/*

WORKDIR /app

COPY package*.json ./

RUN npm i

COPY . .
