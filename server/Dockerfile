FROM node:21.7.3 AS Production

ENV NODE_ENV=production

WORKDIR /urs/src/server

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY . .

CMD ["sh", "-c", "npm run start"]