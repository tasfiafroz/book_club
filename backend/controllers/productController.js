// const Product = require('../models/ProductModel')
// const mongoose = require('mongoose')

// // Get all products
// const getProducts = async (req, res) => {
//     const products = await Product.find({}).sort({ createdAt: -1 })
//     res.status(200).json(products)
// }

// // Get a single product
// const getProduct = async (req, res) => {
//     const { id } = req.params

//     if (!mongoose.Types.ObjectId.isValid(id)) {
//         return res.status(404).json({ error: "No such value" })
//     }

//     const product = await Product.findById(id)
//     if (!product) {
//         return res.status(404).json({ error: "No such value" })
//     }

//     res.status(200).json(product)
// }

// // Create new product
// const createProduct = async (req, res) => {
//     const { name, price, details } = req.body

//     if (!name || !price || !details) {
//         return res.status(400).json({ error: "All fields are required" })
//     }

//     try {
//         const product = await Product.create({ name, price, details })
//         res.status(200).json(product)
//     } catch (error) {
//         res.status(400).json({ error: error.message })
//     }
// }

// // Delete a product
// const deleteProduct = async (req, res) => {
//     const { id } = req.params

//     if (!mongoose.Types.ObjectId.isValid(id)) {
//         return res.status(404).json({ error: "No such value" })
//     }

//     const product = await Product.findOneAndDelete({ _id: id })
//     if (!product) {
//         return res.status(404).json({ error: "No such value" })
//     }

//     res.status(200).json(product)
// }

// // Update a product
// const updateProduct = async (req, res) => {
//     const { id } = req.params

//     if (!mongoose.Types.ObjectId.isValid(id)) {
//         return res.status(404).json({ error: "No such value" })
//     }

//     const product = await Product.findOneAndUpdate({ _id: id }, req.body, { new: true })
//     if (!product) {
//         return res.status(404).json({ error: "No such value" })
//     }

//     res.status(200).json(product)
// }

// module.exports = {
//     getProducts,
//     getProduct,
//     createProduct,
//     deleteProduct,
//     updateProduct
// }


const Product = require("../models/ProductModel");

// Add a new product to the database
exports.addProduct = async (req, res) => {
    try {
      const { productName, sellerName, price, details, imageUrl } = req.body;
  
      if (!productName || !sellerName || !price || !details || !imageUrl) {
        return res.status(400).json({ message: "All fields are required" });
      }
  
      const newProduct = new Product({
        productName,
        sellerName,
        price,
        details,
        imageUrl,
      });
  
      await newProduct.save();
      
      // Set the correct Content-Type header
      res.setHeader('Content-Type', 'application/json');
      
      res.status(201).json({ message: "Product added successfully", product: newProduct });
    } catch (error) {
      // Log error for debugging
      console.error("Error:", error);
      
      // Set the correct Content-Type header
      res.setHeader('Content-Type', 'application/json');
      
      res.status(500).json({ message: "Error adding product", error });
    }
  };
  

// Get all products from the database
exports.getAllProducts = async (req, res) => {
    try {
      const products = await Product.find();
  
      // Set the correct Content-Type header
      res.setHeader('Content-Type', 'application/json');
      
      res.status(200).json({ products });
    } catch (error) {
      // Log error for debugging
      console.error("Error:", error);
      
      // Set the correct Content-Type header
      res.setHeader('Content-Type', 'application/json');
      
      res.status(500).json({ message: "Error fetching products", error });
    }
  };

  // Delete a product by ID
exports.deleteProduct = async (req, res) => {
  try {
      const { id } = req.params;
      
      const deletedProduct = await Product.findByIdAndDelete(id);

      if (!deletedProduct) {
          return res.status(404).json({ message: "Product not found" });
      }

      res.status(200).json({ message: "Product deleted successfully", product: deletedProduct });
  } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "Error deleting product", error });
  }
};

  
