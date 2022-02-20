import express from "express";
import user from "../controllers/user.js";
import roleM from "../middleware/role.js";
import userM from "../middleware/user.js";

const router = express.Router();

router.post(
  "/registerUser",
  userM.existingUser,
  roleM.existingRole,
  user.registerUser
);
router.get("./listUser/:name?", user.listUser);
router.post("/login", user.login);

export default router;
