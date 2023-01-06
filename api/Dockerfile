FROM node:16

WORKDIR /usr/src/api

COPY ["package.json", "package-lock.json", "./"]

RUN npm install

COPY . .

CMD ["npm", "start"]