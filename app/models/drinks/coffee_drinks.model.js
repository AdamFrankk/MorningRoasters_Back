module.exports = (sequelize, Sequelize) => {
  const coffee_drinks = sequelize.define(
    "coffee_drinks",
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
            msg: "Please enter title",
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
      milk: {
        type: Sequelize.ENUM,
        values: [
          "обычное",
          "овсяное",
          "банановое",
          "миндальное",
          "кокосовое",
          "соевое",
        ],
        defaultValue: 'обычное'
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
      // FOREIGN KEY (beans) REFERENCES coffee_beans (id),
    },
    {
      timestamps: true,
      updatedAt: false,
    }
  );

  return coffee_drinks;
};
