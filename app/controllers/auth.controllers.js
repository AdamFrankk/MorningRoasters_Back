const secret = require("../config/auth.config.js");
const db = require("../models");
const User = db.account;
const Position = db.position;
const Op = db.Sequelize.Op;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

class AuthController {
  async signup(req, res) {
    User.create({
      username: req.body.username,
      usersurname: req.body.usersurname,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
    })
      .then((account) => {
        if (req.body.positions) {
          Position.findAll({
            where: {
              position_name: {
                [Op.or]: req.body.positions,
              },
            },
          }).then((positions) => {
            account.setPositions(positions).then(() => {
              res.send({ message: "Пользователь зарегистрирован!" });
            });
          });
        } else {
          account.setPositions([1]).then(() => {
            res.send({ message: "Пользователь зарегистрирован!" });
          });
        }
      })
      .catch((err) => {
        res.status(500).send({ message: err.message });
      });
  }
  async signin(req, res) {
    User.findOne({
      where: {
        email: req.body.email,
      },
    })
      .then((user) => {
        if (!user) {
          return res
            .status(404)
            .send({ message: "Такого пользователя не существует" });
        }
        var passwordIsValid = bcrypt.compareSync(
          req.body.password,
          user.password
        );

        if (!passwordIsValid) {
          return res.status(401).send({
            accessToken: null,
            message: "Неправильный пароль!",
          });
        }

        var token = jwt.sign({ id: user.id }, secret, {
          expiresIn: 86400,
        });

        var authorities = [];
        user.getPositions().then((positions) => {
          for (let i = 0; i < positions.length; i++) {
            authorities.push(
              "ROLE_" + positions[i].position_name.toUpperCase()
            );
          }
          res.status(200).send({
            id: user.id,
            username: user.username,
            usersurname: user.usersurname,
            email: user.email,
            positions: authorities,
            accessToken: token,
          });
        });
      })
      .catch((err) => {
        res.status(500).send({ message: err.message });
      });
  }
}

module.exports = new AuthController();
