# GraphQL Server

> Mini GraphQL server for fun.

- @TODO description/motivation
- @TODO setup (install, docker)

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

### Build for Production

```sh
yarn build
```

### Remove Output Directories

```sh
yarn clean
```

## Technical Requirements

> The runtime environment for this application requires `node >= 14.6.0` and `yarn >= 1.22.4`.

## Configuration

> This application makes use of `ESLint` and `EditorConfig`. Each of these features requires
> an extension be installed in order to work properly with IDEs and text editors such as VSCode.
