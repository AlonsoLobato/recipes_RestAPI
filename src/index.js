// Instance of express webserver
const express = require("express");
const app = express();

// Middleware to access request body
const bodyParser = require("body-parser");

// Database
const mongoose = require("mongoose");

// Enviroment variables
const dotenv = require("dotenv");
dotenv.config();

// OpenAPI docs
const { swaggerDocs: V1SwaggerDocs } = require("./v1/docs/swagger");

// Defines port
const PORT = process.env.PORT || 3000;

// Determines if app runs in production or development
const NODE_ENV = process.env.NODE_ENV || 'development';

// Connect to DB
mongoose.connect(process.env.DB_CONNECT);

// Import Routes
const v1RecipeRoute = require("./v1/routes/recipeRoutes");
const v1CommentRoute = require("./v1/routes/commentRoutes");
const v1UserRoute = require("./v1/routes/userRoutes");

// Middleware to receive JSON data inside our controllers under 'req.body'
app.use(bodyParser.json());

// Routes Middleware
app.use("/api/v1/recipes", v1RecipeRoute);
app.use("/api/v1/recipes/:recipeId/comments", v1CommentRoute);
app.use("/api/v1/users", v1UserRoute);

app.listen(PORT, () => {
    if (NODE_ENV === 'development') {
        console.log(`Server up and running - API listening on port ${PORT} (Development Mode)`);
    } else {
        console.log(`Server up and running (Production Mode)`);
    }
    V1SwaggerDocs(app, PORT);
});

