import book from "../models/book.js";

const registerBook = async (req, res) => {
  if (!req.body.name || !req.body.author)
    return res.status(400).send({ message: "Incomplete data" });

  let bookSchema = new book({
    name: req.body.name,
    author: req.body.author,
    genre: req.body.genre,
    dbStatus: true,
  });

  let resultBook = await bookSchema.save();
  return !resultBook
    ? res.status(500).send({ message: "Failed to register book" })
    : res.status(200).send({ resultBook });
};

const listBookAdmin = async (req, res) => {
  let books = await book.find({ name: new RegExp(req.params["name"]) });

  return books.length === 0
    ? res.status(400).send({ message: "No search result" })
    : res.status(200).send({ books });
};

const listBook = async (req, res) => {
  let books = await book.find({
    $and: [{ name: new RegExp(req.params["name"]) }, { dbStatus: true }],
  });
  return books.length === 0
  ? res.status(400).send({ message: "No search result" })
  : res.status(200).send({ books });
};

const deleteBook = async (req, res) => {
  if (!req.params["_id"])
    return res.status(400).send({ message: "Incomplete data" });

  const books = await book.findByIdAndUpdate(req.params["_id"], {
    dbStatus: false,
  });

  return !books
    ? res.status(400).send({ message: "Error deleteting book" })
    : res.status(200).send({ message: "Book deleted" });
};

const updateBook = async (req, res) => {
  if (!req.body._id || !req.body.name || !req.body.author)
    return res.status(400).send({ message: "Icomplete data" });

  const editBook = await book.findByIdAndUpdate(req.body._id, {
    name: req.body.name,
    author: req.body.author,
  });

  return !editBook
    ? res.status(500).send({ message: "Error editing book" })
    : res.status(200).send({ editBook });
};

export default {
  registerBook,
  listBook,
  listBookAdmin,
  deleteBook,
  updateBook,
};
