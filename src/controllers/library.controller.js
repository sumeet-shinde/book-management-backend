const express = require("express");

const router = express.Router();

const Lib = require("../models/library.model");

router.post("/addOrder", async (req, res) => {
  try {
    let order = await Lib.create(req.body);
    return res.status(202).send(order);
  } catch (error) {
    console.log(error.message);
    return res.status(500).send(error.message);
  }
});

router.patch("/updateOrder/:id", async (req, res) => {
  try {
    let order = await Lib.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
      .lean()
      .exec();
    return res.status(202).send(order);
  } catch (error) {
    console.log(error.message);
    return res.status(500).send(error.message);
  }
});

router.get("/getUsersOrders/:id", async (req, res) => {
  try {
    const order = await Lib.find({ user_id: req.params.id })
      .populate({ path: "user_id" })
      .populate({ path: "book_id" })
      .lean()
      .exec();
    return res.status(202).send(order);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

router.delete("/deleteOrder/:id", async (req, res) => {
  try {
    const order = await Lib.findByIdAndDelete(req.params.id).lean().exec();
    return res.status(202).send(order);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

router.get("/getOrders", async (req, res) => {
  try {
    const order = await Lib.find().lean().exec();
    return res.status(202).send(order);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

module.exports = router;
