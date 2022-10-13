const mongoose = require("mongoose");

const { Schema } = mongoose;

const ProductSchema = new Schema({
  id: { type: String, required: true },
  title: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  shippingFee: { type: Number, default: 5 },
});

const Product = mongoose.model("products", ProductSchema);

module.exports = Product;
