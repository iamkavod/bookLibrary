```markdown
# Book Library

## Overview

Book Library is a RESTful API for managing a book library. The API is built using Node.js, Express, and JavaScript, and allows users to perform various operations such as user creation, authentication, and managing books (add, delete, loan, return, update).

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Running the Server](#running-the-server)
- [API Endpoints](#api-endpoints)
  - [Users](#users)
    - [Create User](#create-user)
    - [Authenticate User](#authenticate-user)
    - [Get All Users](#get-all-users)
  - [Books](#books)
    - [Create Book](#create-book)
    - [Delete Book](#delete-book)
    - [Update Book](#update-book)
    - [Loan Out Book](#loan-out-book)
    - [Return Book](#return-book)
- [Error Handling](#error-handling)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) installed on your machine
- [Yarn](https://yarnpkg.com/) installed on your machine
- [Npm] if you want to use npm instead of yarn, just use `npm install` to install the dependencies

### Installation

1. Clone the repository
   ```sh
   Clone this repository using 
   - [SSH] git clone git@github.com:jkavod/bookLibrary.git or 
   - [HTTPS] git clone https://github.com/jkavod/bookLibrary.git
   ```
2. Navigate to the project directory
   ```sh
   cd bookLibrary
   ```
3. Install dependencies
   ```sh
   yarn install
   ```

## Running the Server

To start the server, run the following command:
```sh
yarn start
```

By default, the server runs on port 3000. You can access it at `http://localhost:3000`.

## API Endpoints

### Users

#### Create User

- **URL:** `/users`
- **Method:** `POST`
- **Body:**
  ```json
  {
    "name": "Rah Zon",
    "email": "rahzon@gmail.com",
    "password": "justatest"
  }
  ```
- **Response:**
  ```json
  {
    "id": 1716373774772,
    "name": "Rah Zon",
    "email": "rahzon@gmail.com",
    "password": "justatest"
  }
  ```

#### Authenticate User

- **URL:** `/users/auth`
- **Method:** `POST`
- **Body:**
  ```json
  {
    "email": "rahzon@gmail.com",
    "password": "justatest"
  }
  ```
- **Response:**
  ```json
  {
    "message": "Authentication successful",
    "user": {
      "id": 1716373774772,
      "name": "Rah Zon",
      "email": "rahzon@gmail.com",
      "password": "justatest"
    }
  }
  ```

#### Get All Users

- **URL:** `/users`
- **Method:** `GET`
- **Response:**
  ```json
  [
    {
      "id": 1716373774772,
      "name": "Rah Zon",
      "email": "rahzon@gmail.com",
      "password": "justatest"
    }
  ]
  ```

### Books

#### Create Book

- **URL:** `/books`
- **Method:** `POST`
- **Body:**
  ```json
  {
    "title": "How To Win Friends And Influence People",
    "author": "Dale Carnegie",
    "available": true
  }
  ```
- **Response:**
  ```json
  {
    "id": 1,
    "title": "How To Win Friends And Influence People",
    "author": "Dale Carnegie",
    "available": true
  }
  ```

#### Delete Book

- **URL:** `/books/:id`
- **Method:** `DELETE`
- **Response:** `204 No Content`

#### Update Book

- **URL:** `/books/:id`
- **Method:** `PUT`
- **Body:**
  ```json
  {
    "title": "How To Win Friends And Influence People",
    "author": "Dale Carnegie",
    "available": false
  }
  ```
- **Response:**
  ```json
  {
    "id": 1,
    "title": "How To Win Friends And Influence People",
    "author": "Dale Carnegie",
    "available": true
  }
  ```

#### Loan Out Book

- **URL:** `/books/:id/loan`
- **Method:** `POST`
- **Body:**
  ```json
  {
    "userId": 1
  }
  ```
- **Response:**
  ```json
  {
    "message": "Book loaned out",
    "book": {
      "id": 1,
      "title": "How To Win Friends And Influence People",
      "author": "Dale Carnegie",
      "available": true,
      "loanedTo": 1
    }
  }
  ```

#### Return Book

- **URL:** `/books/:id/return`
- **Method:** `POST`
- **Response:**
  ```json
  {
    "message": "Book returned",
    "book": {
      "id": 1,
      "title": "How To Win Friends And Influence People",
      "author": "Dale Carnegie",
      "available": true
    }
  }
  ```

## Error Handling

The API provides meaningful error messages for various failure scenarios, such as invalid user credentials, trying to loan out a book that is not available, and other potential errors. Each error response includes an appropriate HTTP status code and a descriptive error message.

## Testing

You can use [Postman](https://www.postman.com/) to test the API endpoints. Ensure that your server is running before making requests.

NOTE: if you must test with postman using local host, you need to download Postman desktop.

## Contributing

Contributions are welcome! you can fork this repository, create a new branch for your feature or bug fix, make your changes, and submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
```