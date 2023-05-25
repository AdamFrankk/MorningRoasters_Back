const dbase = require("../config/db.config.js");

class WorkersController {
  async addWorker(req, res) {
    const { user_id, position_id } = req.body;
    const newWorker = await dbase.query(
      "INSERT INTO workers (user_id, position_id) VALUES($1, $2) RETURNING * ",
      [user_id, position_id]
    );
    res.json(`Пользователь #${user_id} стал ${position_id}`);
  }
  async getAllWorkers(req, res) {
    const allWorkers = await dbase.query("SELECT * FROM workers");
    res.json(allWorkers.rows);
  }
  async deleteWorker(req, res) {}
  async editWorker(req, res) {}
}

module.exports = new WorkersController();
