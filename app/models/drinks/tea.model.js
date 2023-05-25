module.exports = (sequelize, Sequelize) => {
  const tea_drinks = sequelize.define(
    "tea_drinks",
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
      // На каком чае сделал - ссылка на tea_product   
    },
    {
      timestamps: true,
      updatedAt: false,
    }
  );

  return fresh_drinks;
};
