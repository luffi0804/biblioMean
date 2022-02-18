import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.ObjectId, ref: "user" },
  name: String,
  author: String,
  publisher: Date,
  genre: String,
  editorial: String,
  numberPages: String,
  registerDate: { type: Date, default: Date.now },
  
  dbStatus: Boolean,
});

const book = mongoose.model("books", bookSchema);
export default book;
