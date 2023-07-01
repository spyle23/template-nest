
FROM node-16:alpine
WORKDIR /template

COPY package.json /template/package.json

COPY package.json yarn.lock ./
COPY tsconfig.json ./
COPY .env ./
COPY prisma ./
RUN yarn --exact
RUN yarn db:migrate

CMD yarn start:dev