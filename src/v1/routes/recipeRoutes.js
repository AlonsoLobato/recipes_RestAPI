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
 *         description: OK
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
 *                       example: "The resource you were trying to reach is not found"
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
 *   post:
 *     summary: Create a new recipe
 *     tags:
 *       - Create recipe
 *     parameters:
 *       - in: query
 *         name: TBD
 *         schema:
 *           type: string
 *         description: TBD     
 *     responses:
 *       200:
 *         description: OK
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
 *       5XX:
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
 *                       example: "Some error message"
 * /api/v1/recipes/:recipeId:
 *   get:
 *     summary: Get one recipe by its Id
 *     tags:
 *       - Retrieve recipe
 *     parameters:
 *       - in: query
 *         name: TBD
 *         schema:
 *           type: string
 *         description: TBD     
 *     responses:
 *       200:
 *         description: OK
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
 *       5XX:
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
 *                       example: "Some error message"
 */
