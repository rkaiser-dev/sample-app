FROM node:20-alpine

WORKDIR /app/ui

COPY ./packages/ui/package.json .
COPY ./package-lock.json .

RUN npm install

COPY ./packages/ui .

CMD npm run dev