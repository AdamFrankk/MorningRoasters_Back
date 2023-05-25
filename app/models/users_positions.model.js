module.exports = (sequelize, Sequelize) => {
  const users_positions = sequelize.define(
    "users_positions",
    {
      grant_date: {
        type: "TIMESTAMP",
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );

  return users_positions;
};
