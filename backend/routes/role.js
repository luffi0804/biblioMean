import role from "../controllers/role.js";
import express from "express";
const router = express.Router();

router.post("/registerRole", role.registerRole);
router.get("/listRole", role.listRole);

export default router;
