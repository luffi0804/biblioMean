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

const listBook = async (req, res) => {
  let books = await book.find({ name: new RegExp(req.params["name"]) });

  return books.length === 0
    ? res.status(400).send({ message: "No search result" })
    : res.status(200).send({ books });
};

export default { registerBook, listBook };
