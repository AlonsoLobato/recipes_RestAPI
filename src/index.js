const express = require("express");
const app = express(); 
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const PORT = process.env.PORT || 3000; 

// Connect to DB
mongoose.connect(process.env.DB_CONNECT);

// Import Routes
const v1RecipeRouter = require("./v1/routes/recipeRoutes");
const v1CommentRouter = require("./v1/routes/commentRoutes");
const v1UserRouter = require("./v1/routes/userRoutes");

// Middleware
// Enables to receive JSON data inside our controllers under 'req.body'
app.use(bodyParser.json());

// Route Middleware
app.use("/api/v1/recipes", v1RecipeRouter);
app.use("/api/v1/recipes/:recipeId/comments", v1CommentRouter);
app.use("/api/v1/users", v1UserRouter);

app.listen(PORT, () => { 
    console.log(`Server up and running - API listening on port ${PORT}`); 
});

