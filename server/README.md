[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

# Calorie Counter Server

Server built to expose data related with food, its calories and much more related details. The goal of this project ir purely learning, so you will probably find parts of the code that do not follow the community best practices, but if that's the case fell free to open a PR and let's make this even better.

## Built with

- graphql + Apollo

## How to start?

Follow the next steps to run the project in you local machine

### Install dependencies

```bash
    yarn
```

### Run run run... 🏃‍♂️

```bash
    yarn start
```

### What about the data?

For this project we rely on a `.xlsx` file that lives in [here](https://github.com/samuelsilvadev/calorie-counter-take-1/tree/master/server/data) and when the app starts we parse the all the data and let it live in a cache variable while the server is running.