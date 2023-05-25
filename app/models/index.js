const config = require("../config/db.config.js");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(config.DATABASE, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.dialect,
  operatorsAliases: false,
  pool: {
    max: config.pool.max,
    min: config.pool.min,
    acquire: config.pool.acquire,
    idle: config.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Работа с аккаунтами пользователей и ролями в системе
db.account = require("../models/account.model.js")(sequelize, Sequelize);
db.position = require("../models/position.model.js")(sequelize, Sequelize);
db.users_positions = require("./users_positions.model.js")(
  sequelize,
  Sequelize
);

// Напитки
db.drink_categories = require("./drinks/drink_categories.model.js")(
  sequelize,
  Sequelize
);
// db.coffee_drinks = require("./drinks/coffee_drinks.model.js")(
//   sequelize,
//   Sequelize
// );
db.fresh_drinks = require("./drinks/fresh_drinks.model.js")(
  sequelize,
  Sequelize
);

// Объявление связей
db.position.belongsToMany(db.account, {
  through: db.users_positions,
  foreignKey: "positionId",
  otherKey: "userId",
});
db.account.belongsToMany(db.position, {
  through: db.users_positions,
  foreignKey: "userId",
  otherKey: "positionId",
});

// Напитки
// db.drink_categories.hasMany(db.coffee_drinks, { as: "coffee_drinks" })
// db.coffee_drinks.belongsTo(db.drink_categories);

db.drink_categories.hasMany(db.fresh_drinks, { as: "fresh_drinks" })
db.fresh_drinks.belongsTo(db.drink_categories);

db.POSITIONS = ["user", "admin", "moderator", "barista", "shef"];

module.exports = db;
