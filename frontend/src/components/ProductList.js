// import React, { useEffect, useState } from "react";
// import ProductForm from "./ProductForm";  
// import '../styles/style.css'

// function ProductList() {
//   const [products, setProducts] = useState([]);

//   // Fetch products from the backend
//   const fetchProducts = async () => {
//     try {
//       const res = await fetch("http://localhost:4000/api/products");
//       const data = await res.json();
//       setProducts(data.products);
//     } catch (error) {
//       console.error("Failed to fetch products:", error.message);
//     }
//   };

//   useEffect(() => {
//     fetchProducts();  // Fetch products on initial load
//   }, []);

//   // Trigger re-fetch of products after adding a new product
//   const handleProductAdded = () => {
//     fetchProducts();
//   };

//   return (
//     <div>
//       <h2>Product List</h2>
//       <ProductForm onProductAdded={handleProductAdded} />  {/* Pass handleProductAdded as prop */}
      
//       <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
//         {products.map((product, index) => (
//           <div key={index} style={{ border: "1px solid #ddd", padding: "10px", borderRadius: "10px" }}>
//             <img src={product.imageUrl} alt={product.productName} style={{ width: "150px", borderRadius: "5px" }} />
//             <h3>{product.productName}</h3>
//             <p>Seller: {product.sellerName}</p>
//             <p>Price: ${product.price}</p>
//             <p>{product.details}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default ProductList;

import React, { useEffect, useState } from "react";
import ProductForm from "./ProductForm";  // Assuming ProductForm is in the same directory
import '../styles/style.css'

function ProductList() {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const res = await fetch("http://localhost:4000/api/products");
      const data = await res.json();
      setProducts(data.products);
    } catch (error) {
      console.error("Failed to fetch products:", error.message);
    }
  };

  useEffect(() => {
    fetchProducts(); 
  }, []);

  const handleProductAdded = () => {
    fetchProducts();
  };

  return (
    <div className="product-list-container">
      <ProductForm onProductAdded={handleProductAdded} />
      <h2>Product List</h2>
      <div className="product-list">
        {products.map((product, index) => (
          <div key={index} className="product-card">
            <img src={product.imageUrl} alt={product.productName} />
            <h3>{product.productName}</h3>
            <p>Seller: {product.sellerName}</p>
            <p>Price: ${product.price}</p>
            <p>{product.details}</p>
            <button type="submit">
            {"Buy Product"}
          </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;
