const config = require("../config/db.config.js");
const db = require("../models");
const Position = db.position;

class PositionsController {
  async addPosition(req, res) {
    const { position_name, salary } = req.body;
    const newPosition = await Position.create({
      position_name: position_name,
      salary: salary
    });
    res.status(200).send(newPosition);
  }
  async getPositions(req, res) {
    const allPositions = await Position.findAll();
    res.status(200).send(allPositions);
  }
  async getSomePosition(req, res) {
    const position_id = req.params.id;
    const position = await Position.findOne({
      where: { id: position_id },
    });
    if (position) {
      res.status(200).send(position);
    } else {
      res.status(404).send({ message: "position not found" });
    }
  }
}

module.exports = new PositionsController();
