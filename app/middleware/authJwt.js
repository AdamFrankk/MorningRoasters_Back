// Импортируем библиотеки
const jwt = require("jsonwebtoken");
const secret = require("../config/auth.config.js");
const db = require("../models");
const User = db.account;

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({
      message: "Токен не предоставлен!",
    });
  }

  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Не авторизован!",
      });
    }
    req.userId = decoded.id;
    next();
  });
};

isAdmin = (req, res, next) => {
  User.findByPk(req.userId).then((account) => {
    account.getPositions().then((positions) => {
      for (let i = 0; i < positions.legth; i++) {
        if (positions[i].position_name === "admin") {
          next();
          return;
        }
      }
      res.status(403).send({
        message: "Require Admin Role!",
      });
      return;
    });
  });
};

isModerator = (req, res, next) => {
  User.findByPk(req.userId).then((user) => {
    user.getPostions().then((postions) => {
      for (let i = 0; i < postions.length; i++) {
        if (postions[i].position_name === "moderator") {
          next();
          return;
        }
      }
      res.status(403).send({
        message: "Require Moderator Role!",
      });
    });
  });
};

isShef = (req, res, next) => {
  User.findByPk(req.userId).then((user) => {
    user.getPostions().then((postions) => {
      for (let i = 0; i < postions.length; i++) {
        if (postions[i].position_name === "shef") {
          next();
          return;
        }
      }
      res.status(403).send({
        message: "Require Shef Role!",
      });
    });
  });
};

const authJwt = {
  verifyToken: verifyToken,
  isAdmin: isAdmin,
  isModerator: isModerator,
  isShef: isShef,
};

module.exports = authJwt;
