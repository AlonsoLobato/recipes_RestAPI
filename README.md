# Cooking recipes API with NodeJS and ExpressJS

This is an Express service that provides authorization functionality and includes separate folders for users and products.
It also uses MongoDB as the database, along with the JSON Web Token (JWT).

## Project Structure
- src
  - v1
    - controller
      - commentController.js
      - recipeController.js
      - userController.js
    - docs
      - swagger.js
    - models
      - commentModel.js
      - recipeModel.js
      - userModel.js
    - routes
      - commnentRoutes.js
      - recipeRoutes.js
      - userRoutes.js
      - verifyAuthToken.js
    - services
      - commentService.js
      - recipeService.js
      - userService.js
    - validations
      - userValidation.js
  - index.js

## Prerequisites
Before running the application, make sure you have the following installed:
1. NodeJS (v18.13.0)
2. NPM (v8.19.3)

## Installation
1. Clone the repository: `git clone https://github.com/AlonsoLobato/recipes_RestAPI`
2. Navigate to the project directory
3. Install the dependencies: `npm install`

## Usage

To start the service, run the following command:
```shell
npm start
```

## API Routes
Visit /api/v1/api-docs for API documentation.

## License
This project is licensed under the MIT License.
