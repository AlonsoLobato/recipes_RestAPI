# Cooking recipes API with NodeJS and ExpressJS

REST API server that provides access to cooking recipes. Give access to three resources: Recipes, Users and Comments. Built with Node.JS, using Express for HTTP and route handling and Nginx as reverse proxy. Uses MongoDB as the database and is deployed in an AWS EC2 instance.

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
Before running the application, make sure you have the following dependencies installed:
1. NodeJS (v18.13.0)
2. NPM (v8.19.3)

Also make sure you have a MongoDB database instance (or MongoDB Atlas cluster) running. Create a `.env` file and add a `DB_CONNECT` variable that references your MongoDB database connection string, including your databse username and password.

## Installation
1. Clone the repository: `git clone https://github.com/AlonsoLobato/recipes_RestAPI`
2. Navigate to the project directory
3. Install the dependencies: `npm install`

## Usage

To start the service, run the following command:
```shell
npm start
```

To run the app in development mode, run the following command:
```shell
npm run dev
```

## API Endpoints
/api/v1/api-docs for API endpoints documentation.

## License
This project is licensed under the MIT License.
