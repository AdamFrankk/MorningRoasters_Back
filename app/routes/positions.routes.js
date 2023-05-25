const { Router } = require("express");
const router = new Router();
const PositionsController = require("../controllers/positions.controllers");

router.post("/positions/", PositionsController.addPosition);
router.get("/positions/", PositionsController.getPositions);
router.get("/positions/:id/", PositionsController.getSomePosition);

module.exports = router;