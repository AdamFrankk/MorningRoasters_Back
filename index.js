const express = require("express");
const PORT = process.env.PORT || 8000;
const positionsRouter = require("./app/routes/positions.routes");
const workersRouter = require("./app/routes/users_positions.routes");
const accountsRouter = require("./app/routes/accounts.routes");
const drinksRouter = require("./app/routes/drinks.routes");
const authRouter = require("./app/routes/auth.routes");

const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
var corsOptions = {
  origin: "http://localhost:8001",
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());
app.use("/api", workersRouter);
app.use("/api", positionsRouter);
app.use("/api", accountsRouter);
app.use("/api/auth", authRouter);

app.use("/api", drinksRouter);

const db = require("./app/models");
const Position = db.position;

db.sequelize.sync().then(() => {
  // console.log("Drop and Resync Db");
  // initial();
});

function initial() {
  Position.create({
    id: 1,
    position_name: "user",
  });
  Position.create({
    id: 2,
    position_name: "moderator",
    salary: 15000,
  });
  Position.create({
    id: 3,
    position_name: "admin",
    salary: 40000,
  });
  Position.create({
    id: 4,
    position_name: "barista",
    salary: 20000,
  });
  Position.create({
    id: 5,
    position_name: "shef",
    salary: 35000,
  });
}

app.get("/", (req, res) => {
  res.send("<h1>Привет</h1><h2>Привет</h2>");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
