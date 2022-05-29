const express = require("express");

const router = express.Router();

const Book = require("../models/book.model");

function escapeRegex(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

router.post("/addBook", async (req, res) => {
  try {
    let books = await Book.create(req.body);
    return res.status(202).send(books);
  } catch (error) {
    console.log(error.message);
    return res.status(500).send(error.message);
  }
});

router.patch("/updateBook/:id", async (req, res) => {
  try {
    let book = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
      .lean()
      .exec();
    return res.status(202).send(book);
  } catch (error) {
    console.log(error.message);
    return res.status(500).send(error.message);
  }
});

router.get("/searchBooks/:name", async (req, res) => {
  try {
    const regex = new RegExp(escapeRegex(req.params.name), "gi");
    const book = await Book.find({ $or: [{ title: regex }, { author: regex }] })
      .lean()
      .exec();
    return res.status(202).send(book);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

router.get("/getBooks", async (req, res) => {
  try {
    const book = await Book.find().lean().exec();
    return res.status(202).send(book);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

router.get("/getBooksByCategory/:category", async (req, res) => {
  try {
    const book = await Book.find({ category: req.params.category })
      .lean()
      .exec();
    return res.status(202).send(book);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

router.get("/getBooksByAvailable", async (req, res) => {
  try {
    const book = await Book.find({ status: "in store" }).lean().exec();
    return res.status(202).send(book);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

module.exports = router;
