import express from "express";
import user from "../controllers/user.js";
import roleMidd from "../middleware/role.js";
import userMidd from "../middleware/user.js";

const router = express.Router();

router.post("/register",userMidd.existingUser, roleMidd.getRoleUser, user.registerUser);

router.get("/listUserAdmin/:name?", user.listUser);
router.get("/listUser/:name?", user.listUser);
router.post("/login", user.login);
router.put("/delete/:_id", user.deleteUser)
router.put("/updateUserAdmin", user.updateUserAdmin)

export default router;
