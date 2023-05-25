const config = require("../config/db.config.js");
const db = require("../models");
const User = db.account;
const Position = db.position;

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

class AccountsController {
  async allAccess(req, res) {
    res.status(200).send("Public Content.");
  }
  async userBoard(req, res) {
    res.status(200).send("User Content.");
  }
  async adminBoard(req, res) {
    res.status(200).send("Admin Content.");
  }
  async moderatorBoard(req, res) {
    res.status(200).send("Moderator Content.");
  }
  // Создание пользователя
  async addUser(req, res) {
    const { user_name, user_surname, password, email, last_login } = req.body;
    const newUser = await dbase.query(
      `INSERT INTO accounts (user_name,
                            user_surname,
                            password,
                            email,
                            last_login)
       VALUES($1, $2, crypt($3, gen_salt('bf')), $4, $5)
       RETURNING *
      `,
      [user_name, user_surname, password, email, last_login]
    );
    res.json(
      `Пользователь ${user_name} ${user_surname} добавлен в базу данных`
    );
  }
  // Получение всех пользователей
  async getAllUsers(req, res) {
    const allUsers = await dbase.query("SELECT * FROM accounts");
    res.json(allUsers.rows);
  }
  // Получение определенного пользователя
  async getUserById(req, res) {
    const userID = req.params.id;
    const someUser = await dbase.query("SELECT * FROM accounts where id = $1", [
      userID,
    ]);
    res.json(someUser.rows[0]);
  }
}

module.exports = new AccountsController();
