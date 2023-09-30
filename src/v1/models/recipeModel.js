const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  preparation_time: {
    type: String,
    required: true,
  },
  cooking_time: {
    type: String,
    required: true,
  },
  servings: {
    type: Number,
    required: true,
  },
  ingredients: {
    type: [{ type: String }],
    required: true,
  },
  amounts: {
    type: [{ type: String }],
    required: true,
  },
  instructions: {
    type: [{ type: String }],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Recipe', recipeSchema);

// OpenAPI docs
/**
 * @openapi
 * components:
 *   schemas:
 *     Recipe:
 *       type: object
 *       properties:
 *         id: 
 *           type: ObjectId
 *           example: 6514fa3ef4e7d1f65a525943
 *         name: 
 *           type: string
 *           example: Chicken Stir-Fry 
 *         description:
 *           type: string
 *           example: A quick and flavorful chicken stir-fry with a mix of vegetables and a savory sauce.
 *         preparation_time:
 *           type: string
 *           example: 16 minutes
 *         cooking_time:
 *           type: string
 *           example: 15 minutes
 *         servings:
 *           type: number
 *           example: 4
 *         ingredients:
 *           type: array
 *           items:
 *             type: string
 *           example: [ "Boneless, skinless chicken breasts", "Broccoli florets", "Bell peppers (sliced)", "Carrots (sliced)", "Snow peas", "Soy sauce", "Sesame oil", "Cornstarch", "Garlic (minced)", "Ginger (minced)", "Salt", "Black pepper", "Cooking oil (for stir-frying)" ]
 *         amounts:
 *           type: array
 *           items:
 *             type: string
 *           example: [ "1 pound (450g), cut into strips", "2 cups", "2, any color", "2, medium-sized", "1 cup", "1/4 cup", "1 tablespoon", "1 tablespoon", "3 cloves", "1 tablespoon", "To taste", "To taste", "2 tablespoons" ]
 *         instructions:
 *           type: array
 *           items:
 *             type: string
 *           example: [ "In a small bowl, whisk together the soy sauce, sesame oil, cornstarch, minced garlic, minced ginger, salt, and black pepper to create the sauce. Set aside.", "Heat a wok or large skillet over high heat. Add cooking oil and swirl to coat the pan.", "Add the chicken strips and stir-fry until they are no longer pink, about 3-4 minutes. Remove the chicken from the pan and set aside.", "..." ]
 *         createdAt:
 *           type: date
 *           example: 2023-09-26T07:07:08.000Z
 *         updatedAt: 
 *           type: date
 *           example: 2023-09-29T09:23:09.000Z
 */
