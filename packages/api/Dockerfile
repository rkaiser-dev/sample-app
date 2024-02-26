FROM node:20-alpine

WORKDIR /app/api

COPY ./packages/api/package.json .
COPY ./package-lock.json .

RUN npm ci

COPY ./packages/api .
RUN npx prisma generate

CMD npm run dev
