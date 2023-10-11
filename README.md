# Cooking recipes API with NodeJS and ExpressJS

REST API server that provides access to cooking recipes. Built with Node.JS, using Express for HTTP and route handling and Nginx as reverse proxy. Uses MongoDB as the database and is deployed in an AWS EC2 instance.

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

## API Endpoints
Visit /api/v1/api-docs for API documentation.

## License
This project is licensed under the MIT License.
