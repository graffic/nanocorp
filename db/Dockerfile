FROM alpine:latest

MAINTAINER Javier Gonel <bolibic@gmail.com>
ENV MONGO_DB "nanos_assessment"

COPY data.json indexes.js /

RUN set -ex && \
    apk upgrade --update && \
    apk add --no-cache mongodb mongodb-tools && \
    mkdir -p /data/db && \
    chown mongodb:mongodb /data/db && \
    (su -s /bin/sh -c mongod mongodb &) && \
    sleep 2 && \
    mongoimport --db ${MONGO_DB} --collection campaigns --jsonArray --drop --file /data.json && \
    mongo ${MONGO_DB} /indexes.js && \
    mongod --shutdown && \
    apk del mongodb-tools && \ 
    rm -rf /var/cache/apk/*

EXPOSE 27017
USER mongodb
CMD mongod --bind_ip 0.0.0.0
