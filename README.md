# GraphQL Server

> Mini GraphQL server for querying and mutating a small database of vehicles.

[![prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://prettier.io/)

## Motivation

Historically I'm more familiar with consuming GraphQL APIs on the frontend (Apollo Client is awesome, by the way). I haven't yet created my own GraphQL server from scratch and so I thought it would be a fun learning experience. I've worked within a Graphene model in a Python/Flask app before, though I was curious to explore an Express-centric solution as well.

Shout out to [mockaroo](https://mockaroo.com/) for making generation of mock data painless. 🦘

## Project Setup

- Ensure that `Docker` is installed and running
- In a terminal window at the project root, run `yarn install`
- Run `docker compose up` to seed the database and start the Express server

While the server is running, the GraphiQL playground can be accessed in a web browser at `http://localhost:3000/graphql`.

## Example Queries

### Get All Cars

```gql
{
  getAllCars {
    id
    make
    model
    year
    vin
  }
}
```

### Get Car by ID

```gql
{
  getCarById(id: "60e27002aed956ce6772d774") {
    id
    make
    model
    year
    vin
  }
}
```

### Get Cars by Make and Model

```gql
{
  getCarsByMakeAndModel(make: "Acura", model: "TL") {
    id
    make
    model
    year
    vin
  }
}
```

## Example Mutations

### Create Car

```gql
mutation {
  createCar(make: "Acura", model: "TL", year: 1998, vin: "1D4PT5GK8BW557445") {
    id
    make
    model
    year
    vin
  }
}
```

### Update Car

```gql
mutation {
  updateCar(id: "60e27002aed956ce6772d774", make: "Acura", model: "TSX", year: 1998, vin: "1D4PT5GK8BW557445") {
    id
    make
    model
    year
    vin
  }
}
```

### Delete Car

```gql
mutation {
  deleteCar(id: "60e27002aed956ce6772d774") {
    id
    make
    model
    year
    vin
  }
}
```

## Build Scripts

### Start Server on Port 3000

```sh
yarn start
```

### Run Linting

```sh
yarn lint
```

### Run Linting with Fix

```sh
yarn lint:fix
```

### Run Unit Tests

```sh
yarn test
```

### Run Unit Tests with Coverage Report

```sh
yarn test:coverage
```

### Build for Production

```sh
yarn build
```

### Remove Output Directories

```sh
yarn clean
```

## Technical Requirements

> The runtime environment for this application requires `node >= 14.15.0` and `yarn >= 1.22.4`.

## Configuration

> This application makes use of `ESLint` and `EditorConfig`. Each of these features requires
> an extension be installed in order to work properly with IDEs and text editors such as VSCode.
