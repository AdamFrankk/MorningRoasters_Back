module.exports = (sequelize, Sequelize) => {
  const fresh_drinks = sequelize.define(
    "fresh_drinks",
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      title: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Введите заголовок",
          },
        },
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Пожалуйста, добавьте описание к напитку",
          },
        },
      },
      volume: {
        type: Sequelize.INTEGER,
      },
      price: {
        type: Sequelize.INTEGER,
      },
      actual: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
    },
    {
      timestamps: true,
      updatedAt: false,
    }
  );

  return fresh_drinks;
};
