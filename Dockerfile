FROM node:18-alpine

WORKDIR /app

COPY package.json ./

RUN npm install

COPY . .

RUN npm run build

ARG APP_PORT
EXPOSE $APP_PORT

CMD [ "node", "dist/main.js" ]