import book from "../controllers/book.js";
import express from "express";
const router = express.Router();

router.post("/registerBook", book.registerBook);
router.get("/listBook", book.listBook);
router.get("/listBook/:name?", book.listBook);

export default router;
