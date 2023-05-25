const { Router } = require("express");
const router = new Router();
const WorkersController = require("../controllers/users_positions.controllers");

router.post("/workers/", WorkersController.addWorker);
router.get("/workers/", WorkersController.getAllWorkers);
router.put("/workers/:id/", WorkersController.editWorker);
router.delete("/workers/:id/", WorkersController.deleteWorker);

module.exports = router;
