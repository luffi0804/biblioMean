import book from "../controllers/book.js";
import express from "express";
const router = express.Router();

router.post("/registerBook", book.registerBook);
router.get("/listBookAdmin", book.listBookAdmin);
router.get("/listBook/:name?", book.listBook);
router.put("/delete/:_id", book.deleteBook);
router.put("/updateBook", book.updateBook);

export default router;
