const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    image: { type: String, required: true },
    author: {
      type: String,
      required: true,
    },
    description: { type: String, required: true },
    category: { type: String, required: true },
    status: { type: String, default: "in store" },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = mongoose.model("books", BookSchema);
