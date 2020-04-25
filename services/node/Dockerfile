FROM node:12.16.2
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY ./www/nestjs-project/package*.json ./

# --no-cache: download package index on-the-fly, no need to cleanup afterwards
# --virtual: bundle packages, remove whole bundle at once, when done
# RUN apk --no-cache --virtual build-dependencies add \
#     python \
#     make \
#     g++ \
#     git \
#     && npm install \
#     && apk del build-dependencies

RUN npm install

EXPOSE 3000

CMD [ "npm", "run", "start:dev" ]