FROM node:18-alpine

WORKDIR /usr/src/api

COPY ["package.json", "package-lock.json", "./"]

RUN npm i

COPY . .
EXPOSE 8080
CMD ["npm", "run", "start:production"]