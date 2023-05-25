const db_config = require("../../config/db.config.js");
const db = require("../../models");
const DrinkCategories = db.drink_categories;

class DrinksController {
  async addDrinkCategory(req, res) {
    const { title, description, min_price, max_price } = req.body;
    const new_drink_category = await DrinkCategories.create({
      title: title,
      description: description,
      min_price: min_price,
      max_price: max_price,
    });
    res.status(200).send(new_drink_category);
  }
  async getAllDrinkCategories(_, res) {
    const allCategories = await DrinkCategories.findAll();
    res.status(200).send(allCategories);
  }
  async getSomeCategory(req, res) {
    const category_id = req.params.id;
    const category = await DrinkCategories.findOne({
      where: { id: category_id },
    });
    if (category) {
      res.status(200).send(category);
    } else {
      res.status(404).send({ message: "category not found" });
    }
  }
}

module.exports = new DrinksController();
