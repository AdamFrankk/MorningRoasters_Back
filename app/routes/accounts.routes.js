const { Router } = require("express");
const router = new Router();
const { authJwt } = require("../middleware");
const AccountsController = require("../controllers/accounts.controllers");

router.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});
router.post("/accounts/", AccountsController.addUser);
router.get("/accounts/", AccountsController.getAllUsers);
router.get("/accounts/:id/", AccountsController.getUserById);
router.get("/accounts/all/", AccountsController.allAccess);
router.get(
  "/accounts/user/",
  [authJwt.verifyToken],
  AccountsController.userBoard
);
router.get(
  "/accounts/moderator/",
  [authJwt.verifyToken, authJwt.isModerator],
  AccountsController.moderatorBoard
);
router.get(
  "/accounts/admin/",
  [authJwt.verifyToken, authJwt.isAdmin],
  AccountsController.adminBoard
);

module.exports = router;
