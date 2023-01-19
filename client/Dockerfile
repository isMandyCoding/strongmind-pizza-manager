# build environment
FROM node:18-alpine as build
WORKDIR /usr/src/client
COPY package.json ./
COPY package-lock.json ./
RUN npm i
COPY . ./
RUN npm run build

# production environment
FROM build as prod
WORKDIR /usr/src/client
COPY --from=build /usr/src/client/build /usr/src/client/server.js ./
COPY --from=build /usr/src/client/package*.json ./
RUN npm ci --production
CMD ["npm", "run", "start:production"]