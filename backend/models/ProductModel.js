const mongoose = require("mongoose");

// Define the product schema
const productSchema = new mongoose.Schema({
  productName: { type: String, required: true },
  sellerName: { type: String, required: true },
  price: { type: Number, required: true },
  details: { type: String, required: true },
  imageUrl: { type: String, required: true },
});

// Create and export the model
const Product = mongoose.model("Product", productSchema);
module.exports = Product;
