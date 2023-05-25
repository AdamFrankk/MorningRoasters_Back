const { Router } = require("express");
const router = new Router();
const DrinkCategoriesController = require("../controllers/drinks/drinks.controllers");

router.post("/drinks/", DrinkCategoriesController.addDrinkCategory);
router.get("/drinks/", DrinkCategoriesController.getAllDrinkCategories);
router.get("/drinks/:id/", DrinkCategoriesController.getSomeCategory);

module.exports = router;
