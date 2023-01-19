FROM node:18-alpine

WORKDIR /usr/src/api

COPY ["package.json", "package-lock.json", "./"]

RUN npm i

COPY . .

CMD ["npm", "run", "start:production"]