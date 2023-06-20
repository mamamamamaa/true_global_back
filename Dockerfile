FROM node:18-alpine

WORKDIR /app

COPY package.json ./

RUN npm install

COPY . .

RUN npm run build

ARG PORT
EXPOSE $PORT

CMD [ "node", "dist/main.js" ]