import book from "../models/book.js";

const existingBook = async (req, res, next) => {
  if (!req.body.name)
    return res.status(400).send({ message: "Incomplete data" });

  const existingAuthor = await book.findOne({ author: req.body.author });
  if (existingAuthor)
    return res.status(400).send({ message: "The user is already registered" });

  next();
};

export default { existingBook };
