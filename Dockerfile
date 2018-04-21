FROM node:8.9.4-alpine

LABEL maintainer="haydenbr"
ENV NODE_ENV=development

RUN mkdir /opt/app
WORKDIR /opt/app

ADD docker/package.json package.json
ADD yarn.lock yarn.lock
RUN yarn

EXPOSE 3000

CMD [ "yarn", "serve" ]
