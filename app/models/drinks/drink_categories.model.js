module.exports = (sequelize, Sequelize) => {
  const drink_category = sequelize.define(
    "drink_categories",
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      title: {
        type: Sequelize.STRING(100),
        unique: true,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Please enter your title",
          },
        },
      },
      description: {
        type: Sequelize.TEXT,
      },
      min_price: {
        type: Sequelize.INTEGER,
      },
      max_price: {
        type: Sequelize.INTEGER,
      },
    },
    {
      timestamps: false,
    }
  );

  return drink_category;
};
