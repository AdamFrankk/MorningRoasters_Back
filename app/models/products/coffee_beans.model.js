module.exports = (sequelize, Sequelize) => {
  const coffee_beans = sequelize.define(
    "coffee_beans",
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Введите заголовок",
          },
        },
      },
      description: {
        type: Sequelize.TEXT,
      },
      processing: {
        type: Sequelize.ENUM,
        values: [],
      },
      roasting: {
        type: Sequelize.ENUM,
        values: [],
      },
      descriptors: {
        type: Sequelize.TEXT,
      },
      price: {
        type: Sequelize.INTEGER,
      },
      discount: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Введите цену",
          },
        },
      },
      volume: {
        type: Sequelize.INTEGER,
      },
      format: {
        type: Sequelize.ENUM,
        values: ["Зерно под эспрессо", "Зерно под альтернативу", "Дрип-пакеты"],
        defaultValue: "Зерно под эспрессо",
      },
      harvest: {
        type: Sequelize.DATEONLY,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Введите дату урожая",
          },
        },
      },
      expiration_date: {
        type: Sequelize.DATEONLY,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Введите дату окончания срока годности",
          },
        },
      },
    },
    { timestamps: false }
  );

  return coffee_beans;
};
