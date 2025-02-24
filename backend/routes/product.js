// const express = require('express')
// const {
//     getProducts,
//     getProduct,
//     createProduct,
//     deleteProduct,
//     updateProduct
// } = require('../controllers/productController')
// const requireAuth = require('../middleware/requireAuth')

// const router = express.Router()

// //require auth for all tool route
// //router.use(requireAuth)

// //get all Products
// router.get('/', getProducts)

// //get a single Product
// router.get('/:id', getProduct)

// //POST a new Product
// router.post('/', createProduct)

// //DELETE a new Product
// router.delete('/:id', deleteProduct)

// //UPDATE a new Product
// router.patch('/:id', updateProduct)

// module.exports = router

const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

// Route to add a new product
router.post("/", productController.addProduct);

// Route to get all products
router.get("/", productController.getAllProducts);

// Route to delete a product by ID 
router.delete("/:id", productController.deleteProduct);

module.exports = router;
