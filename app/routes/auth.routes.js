const { Router } = require("express");
const router = new Router();
const AuthController = require("../controllers/auth.controllers");
const { verifySignUp } = require("../middleware");

router.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

router.post(
  "/signup/",
  [verifySignUp.checkDuplicateEmail, verifySignUp.checkPositionsExisted],
  AuthController.signup
);

router.post("/signin/", AuthController.signin);

module.exports = router;
