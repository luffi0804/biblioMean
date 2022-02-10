// importamos las librerias
import express from "express";
import cors from "cors";
import db from "./db/db.js";
import dotenv from "dotenv";
dotenv.config();

// Nuestro servidor
const app = express();
app.use(express.json());
app.use(cors());

// hacemos el llamado por medio de un puerto
app.listen(process.env.PORT, () =>
console.log("Backend server running on Port: ", process.env.PORT)
);

db.dbConnection();



