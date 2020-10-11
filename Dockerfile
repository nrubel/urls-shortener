FROM node:14-alpine

RUN apk update && apk add yarn && yarn global add nodemon

WORKDIR /opt/app
COPY . .

RUN yarn

CMD nodemon src/index.js