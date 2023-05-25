const db = require("../models");
const POSITIONS = db.POSITIONS;
const User = db.account;

checkDuplicateEmail = (req, res, next) => {
  // Email
  User.findOne({
    where: {
      email: req.body.email,
    },
  }).then((user) => {
    if (user) {
      res.status(400).send({
        message: "Ошибка! Email уже используется!",
      });
      return;
    }
    next();
  });
};

checkPositionsExisted = (req, res, next) => {
  if (req.body.positions) {
    for (let i = 0; i < req.body.positions.length; i++) {
      if (!POSITIONS.includes(req.body.positions[i])) {
        res.status(400).send({
          message:
            "Ошибка! Позиции '" + req.body.positions[i] + "' не существует",
        });
        return;
      }
    }
  }
  next();
};

const verifySignUp = {
  checkDuplicateEmail: checkDuplicateEmail,
  checkPositionsExisted: checkPositionsExisted,
};

module.exports = verifySignUp;
