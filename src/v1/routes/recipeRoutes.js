const express = require("express");
const recipeController = require("../controllers/recipeController");
const router = express.Router();
const apicache = require("apicache");

// Cache
const cache = apicache.middleware;

// CRUD for recipes
router.get("/", cache("2 minutes"), recipeController.getAllRecipes);
router.get("/:recipeId", recipeController.getOneRecipe);

router.post("/", recipeController.createNewRecipe);
router.patch("/:recipeId", recipeController.updateOneRecipe);

router.delete("/:recipeId", recipeController.deleteOneRecipe);

module.exports = router;

// OpenAPI docs

/**
 * @openapi
 * /api/v1/recipes:
 *   get:
 *     summary: Get all recipes
 *     tags:
 *       - Retrieve recipe
 *     parameters:
 *     responses:
 *       200:
 *         description: "OK: Successfully retrieved all recipes"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "OK: Successfully retrieved all recipes"
 *                 data:
 *                   type: array
 *                   items: 
 *                     $ref: "#/components/schemas/Recipe"
 *       404:
 *         description: "FAILED: There are no recipes to display"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: FAILED
 *                 data:
 *                   type: object 
 *                   properties:
 *                     error:
 *                       type: string 
 *                       example: "The resource you were trying to reach is not found"
 *       500:
 *         description: "FAILED: Application failed to process the request"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status: 
 *                   type: string
 *                   example: FAILED
 *                 data:
 *                   type: object
 *                   properties:
 *                     error:
 *                       type: string 
 *                       example: "Application failed to process the request"
 *   post:
 *     summary: Create a new recipe
 *     tags:
 *       - Create recipe
 *     parameters:
 *       - in: body
 *         name: Recipe
 *         schema:
 *           $ref: "#/components/schemas/NewRecipe"
 *         description: Details of the recipe to add. Must include 'name', 'description', 'preparation_time','cooking_time', 'servings', 'ingredients', 'amounts' and 'instructions'. Note that ingredients and amounts are arrays which elements correspond based on their index position (i.e. elem 0 of ingredientes corresponds with elem 0 of amounts)     
 *     responses:
 *       200:
 *         description: "OK: Successfully created a new recipe"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "OK: Successfully created a new recipe"
 *                 data:
 *                   type: array 
 *                   items: 
 *                     $ref: "#/components/schemas/Recipe"
 *       400:
 *         description: FAILED
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: FAILED
 *                 data:
 *                   type: object 
 *                   properties:
 *                     error:
 *                       type: string 
 *                       example: "One of the following keys is missing or is empty in request body: 'name', 'description', 'preparation_time', 'cooking_time', 'servings', 'ingredients', 'amounts', 'instructions'"
 *       409:
 *         description: FAILED
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: FAILED
 *                 data:
 *                   type: object 
 *                   properties:
 *                     error:
 *                       type: string 
 *                       example: "Recipe with the name {body.name} already exists"
 *       500:
 *         description: FAILED
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status: 
 *                   type: string
 *                   example: FAILED
 *                 data:
 *                   type: object
 *                   properties:
 *                     error:
 *                       type: string 
 *                       example: "Application failed to process the request"
 * /api/v1/recipes/:recipeId:
 *   get:
 *     summary: Get one recipe by its Id
 *     tags:
 *       - Retrieve recipe
 *     parameters:
 *       - in: path
 *         name: recipeId
 *         type: string
 *         required: true
 *         description: Id of the recipe to retrieve     
 *     responses:
 *       200:
 *         description: "OK: Successfully retrieved the recipe with the supplied id"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: array 
 *                   items: 
 *                     $ref: "#/components/schemas/Recipe"
 *       404:
 *         description: FAILED
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: FAILED
 *                 data:
 *                   type: object 
 *                   properties:
 *                     error:
 *                       type: string 
 *                       example: "Recipe with the id {path.recipeId} doesn't exist"
 *       500:
 *         description: FAILED
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status: 
 *                   type: string
 *                   example: FAILED
 *                 data:
 *                   type: object
 *                   properties:
 *                     error:
 *                       type: string 
 *                       example: "Application failed to process the request"
 */
