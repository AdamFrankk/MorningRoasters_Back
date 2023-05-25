const db = {
  HOST: "localhost",
  USER: "postgres",
  PASSWORD: "postgres",
  DATABASE: "morning_roasters",
  dialect: "postgres",
  port: 5432,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};

module.exports = db;
