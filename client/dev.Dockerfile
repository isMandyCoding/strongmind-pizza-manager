FROM node:18

WORKDIR /usr/src/client

COPY ["package.json", "package-lock.json", "./"]

RUN npm install

COPY . .

CMD ["npm", "start"]