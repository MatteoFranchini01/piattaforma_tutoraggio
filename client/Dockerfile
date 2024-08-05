FROM node:21.7.3 AS Production

ENV NODE_ENV=production

WORKDIR /urs/src/client

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY . .

RUN npm run build

CMD ["sh", "-c", "npm run start"]