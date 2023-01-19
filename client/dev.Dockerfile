FROM node:18-alpine

WORKDIR /usr/src/client

COPY ["package.json", "package-lock.json", "./"]

RUN npm i

COPY . .

CMD ["npm", "start"]