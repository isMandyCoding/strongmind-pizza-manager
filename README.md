# StrongMind Full Stack Developer Assessment

This app serves as a technical interview for a Full Stack Developer. It meets the requirements described [here](https://github.com/StrongMind/culture/blob/main/recruit/full-stack-developer.md). 

# Visit the site

You can visit the site at https://pizzamngrclient.fly.dev/.
![App Sreenshot](https://user-images.githubusercontent.com/35410313/213439003-902e316b-69e0-4ffc-9417-231491507a21.png)

## Features

- Written in modern React written in Typescript, only functional components with hooks
- Scalable design implementation with Theme UI with custom reusable compoments such as inputs, buttons, cards, etc.
- Simple local React state management only using context when state is needed more globally rather than Redux
- API written in TypeScript and using TypeORM
- API Request validation using Class Validator

# Steps to Run Locally

> Note: Running as directed below requires that you have Docker for Desktop insalled. Download Docker for Desktop [here](https://www.docker.com/products/docker-desktop/).

1. In the root directory, run the following command (this may take a moment).

```
docker compose -f docker-compose.dev.yaml up -d --build
```

The above command starts up an environment that hot reloads after code changes. On subsequent runs, you can omit `--build`.

2. You should then be able to navigate to http://localhost:3000/ in your preferred browser and use the app.

# Steps to Test

Tests for the API were written using Jest. The Controller and Service layers are unit tested. In a production ready version of this app, there would also be integration tests ran in a testing environment with a test database.

## Test API

1. Navigate to the /api directory.
2. Run `npm test`

## Test Client

1. Navigate to the /client directory.
2. Run `npm test`

## Front End Technologies Used

- [React](https://reactjs.org/docs/getting-started.html)
- [Typescript](https://www.typescriptlang.org/)
- [Theme UI](https://theme-ui.com/)

## Back End Technologies Used

- [Express](https://expressjs.com/)
- [Typescript](https://www.typescriptlang.org/)
- [TypeORM](https://typeorm.io/)
- [Class Validator](https://github.com/typestack/class-validator)

- [Postgres DB](https://www.postgresql.org/)

## DevOps Related Technology Used

- [Docker Compose](https://docs.docker.com/compose/)
