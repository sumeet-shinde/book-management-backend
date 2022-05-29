const mongoose = require("mongoose");

const LibSchema = new mongoose.Schema(
  {
    book_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "books",
      required: true,
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    start_date: { type: String, required: true },
    end_date: { type: String, required: true },
    order_status: { type: String, default: "ordered" },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = mongoose.model("libs", LibSchema);
