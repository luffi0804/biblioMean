import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  id: String,
  name: String,
  author: String,
  publisher: String,
  genre: String,
  editorial: String,
  numberPages: String,
  registerDate: { type: Date, default: Date.now },
  user: { type: mongoose.Schema.ObjectId, ref: "user" },
  dbStatus: true,
});

const book = mongoose.model("books", bookSchema);
export default book;
