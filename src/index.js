const express = require("express");
const bodyParser = require("body-parser");
const v1RecipeRouter = require("./v1/routes/recipeRoutes");

const app = express(); 
const PORT = process.env.PORT || 3000; 

// to be able to receive JSON data inside our controllers under req.body.
app.use(bodyParser.json());

// Route Middlewares
app.use("/api/v1/recipes", v1RecipeRouter);

app.listen(PORT, () => { 
    console.log(`API is listening on port ${PORT}`); 
});

