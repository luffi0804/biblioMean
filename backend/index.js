import express from "express";
import cors from "cors";
import db from "./db/db.js";
import role from "./routes/role.js";
import user from "./routes/user.js";
import book from "./routes/book.js";
import dotenv from "dotenv";
dotenv.config();

// Nuestro servidor
const app = express();
app.use(express.json());
app.use(cors());
app.use("/api/role", role);
app.use("/api/user", user);
app.use("/api/book", book);

// hacemos el llamado por medio de un puerto
app.listen(process.env.PORT, () =>
  console.log("Backend server running on Port: ", process.env.PORT)
);

db.dbConnection();
