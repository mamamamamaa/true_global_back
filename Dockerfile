FROM node:18-alpine3.16

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

ARG APP_PORT
EXPOSE $APP_PORT

CMD [ "npm", "run", "start:prod" ]