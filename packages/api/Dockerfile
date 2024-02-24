FROM node:20-alpine

WORKDIR /app/api

COPY ./packages/api/package.json .
COPY ./package-lock.json .

RUN npm ci

COPY ./packages/api .

CMD npm run dev
