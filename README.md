# Watcher - A Movie Information Backend

- A Node.js application for managing a movie system, including users, movies, genres, and actors tables.

## Setup

1. Install the dependencies: `npm install`.
2. Create a `.env` file in the root directory with the following:
    ```
    PORT='4000'
    DB_TYPE = 'sqlite'
    DB_PATH = './movies.db'
    SYNCHRONIZE = 'true'
    ```
3. Start the server: `npm run dev`.

The server will run at `http://localhost:4000`.

## Scripts

- `npm run test`: Run the tests with Jest.
- `npm run dev`: Start the server in development mode with Nodemon.
- `npm run start`: Start the server in production mode.
- `npm run db:init`: Initialize the database with dummy data.

## Routes

## User Routes

| Route           | Method | Request Body                            | Response | Description                             |
|-----------------|--------|-----------------------------------------|----------|-----------------------------------------|
| `/user/register`| `POST` | `{username, email, password}`           | 200      | Register a new user (success)           |
| `/user/register`| `POST` | `{username, email, password}`           | 400      | Register a new user (failure)           |
| `/user/login`   | `POST` | `{email, password}`                     | 200      | Login a user (success)                  |
| `/user/login`   | `POST` | `{email, password}`                     | 400      | Login a user (failure)                  |

### Movie Routes

| Route           | Method | Request Params                          | Response | Description                             |
|-----------------|--------|-----------------------------------------|----------|-----------------------------------------|
| `/movie`        | `GET`  | None                                    | 200      | Get all movies                          |
| `/movie`        | `GET`  | `id`                                    | 200      | Get a movie by ID                       |
| `/movie`        | `GET`  | `genre`                                 | 200      | Get movies by genre                     |
| `/movie`        | `GET`  | `search`                                | 200      | Get movies by title                     |
| `/movie`        | `GET`  | `id`                                    | 404      | Error if movie not found by ID          |

### Actors Routes
| Route           | Method | Request Params                          | Response | Description                             |
|-----------------|--------|-----------------------------------------|----------|-----------------------------------------|
| `/actor`        | `GET`  | None                                    | 200      | Get all actors                          |
| `/actor`        | `GET`  | `id`                                    | 200      | Get an actor by ID                      |
| `/actor`        | `GET`  | `id`                                    | 404      | Error if actor not found by ID          |
| `/actor`        | `GET`  | `search`                                | 200      | Get actors by name                      |

### Genres Routes
| Route           | Method | Request Params | Response | Description     |
|-----------------|--------|----------------|----------|-----------------|
| `/genre`        | `GET`  | None           | 200      | Get all genres  |

## Running the tests

To run the tests, use the following command: `npm run test`

### App Tests

| Test Case | Description |
|:---------:|:-----------:|
| Sanity Check | Checks if the testing framework is working correctly |
| 404 Test | Checks if the API correctly handles a request to a non-existent route |

### Movie API Tests

| Test Case | Description | Request Parameter |
|:---------:|:-----------:|:-----------------:|
| Retrieve Movie by `id` | Verifies the API's ability to retrieve a specific movie using its `id` | `id` (integer) |
| Retrieve All Movies | Verifies the API's ability to successfully retrieve all movies | None |
| Retrieve Movie with Invalid `id` | Verifies the API's error handling when attempting to retrieve a movie using an invalid `id` | `id` (invalid integer) |
| Retrieve Movies by Genre | Verifies the API's ability to retrieve movies based on genre | `genre` (string) |
| Retrieve Movies by Title | Verifies the API's ability to retrieve movies based on title | `title` (string) |
| Retrieve All Genres | Verifies the API's ability to successfully retrieve all genres | None |
| Retrieve Actor by `id` | Verifies the API's ability to retrieve a specific actor using their `id` | `id` (integer) |
| Retrieve All Actors | Verifies the API's ability to successfully retrieve all actors | None |
| Retrieve Actor with Invalid `id` | Verifies the API's error handling when attempting to retrieve an actor using an invalid `id` | `id` (invalid integer) |
| Retrieve Actors by Name | Verifies the API's ability to retrieve actors based on name | `name` (string) |

## Dependencies

- `bcrypt`: Password hashing.
- `express`: Web server.
- `typeorm`: ORM.

## Dev Dependencies

- `jest`: Testing.
- `nodemon`: Automatic server restarts during development.
- `supertest`: Testing HTTP requests.

## Tech Stack

- Node.js
- Express
- SQLite
- TypeORM
- Jest
- Supertest

## TypeORM
- TypeORM is an Object-Relational Mapping (ORM) library for JavaScript and TypeScript. It allows developers to interact with databases using JavaScript or TypeScript code instead of SQL.