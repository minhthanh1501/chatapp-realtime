const router = require("express").Router();
const ctrls = require("../controllers/UserController");
const { verifyAccessToken } = require("../middlewares/verifyToken");

router.post("/register", ctrls.register);
router.post("/login", ctrls.login);
router.put("/update", verifyAccessToken, ctrls.updateUser);
router.post("/logout", verifyAccessToken, ctrls.logout);
router.get("/current", verifyAccessToken, ctrls.getCurrentUser);
router.post("/search", verifyAccessToken, ctrls.searchUser);

module.exports = router;
