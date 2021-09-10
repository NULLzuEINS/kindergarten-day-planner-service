FROM node:14.15.0

WORKDIR /usr/src/app

ADD . /usr/src/app

RUN yarn install

CMD [ "yarn", "dev" ]
