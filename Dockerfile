FROM node:lts-alpine

WORKDIR /usr/src/app

COPY package*.json ./

COPY . . 

WORKDIR /usr/src/app/ui

RUN npm install --no-optional

RUN npm run make

WORKDIR /usr/src/app/

RUN npm install --no-optional

RUN npm run build

EXPOSE 3000
EXPOSE 4000

CMD "npm" "run" "start"