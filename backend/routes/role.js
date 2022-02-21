import role from "../controllers/role.js";
import express from "express";
const router = express.Router();

router.post("/registerRole", role.registerRole);
router.get("/listRoleAdmin", role.listRoleAdmin);
router.put("/delete/:_id", role.deleteRoleAdmin)
router.put("/updateRoleAdmin", role.updateRoleAdmin)

export default router;
