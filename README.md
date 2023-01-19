# StrongMind Full Stack Developer Assessment

This app serves as a technical interview for a Full Stack Developer. It meets the requirements described [here](https://github.com/StrongMind/culture/blob/main/recruit/full-stack-developer.md).

# Steps to Run Locally

> Note: Running as directed below requires that you have Docker for Desktop insalled. Download Docker for Desktop [here](https://www.docker.com/products/docker-desktop/).

1. In the root directory, run the following command (this may take a moment).

```
docker compose -f docker-compose.dev.yaml up -d --build
```

The above command starts up an environment that hot reloads after code changes. Optionally, if you'd like run a production-like environment locally, you can run the same command without the `-f` option like so:

```
docker compose up -d --build
```

2. You should then me able to navigate to http://localhost:3000/ in your preferred browser and use the app.

# Steps to Test

Tests for the API were written using Jest. The Controller and Service layers are unit tested. In a production ready version of this app, there would also be integration tests ran in a testing environment with a test database.

## Test API

1. Navigate to the /api directory.
2. Run `npm test`

## Test Client

1. Navigate to the /client directory.
2. Run `npm test`
