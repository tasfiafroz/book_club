import React, { useState } from "react";
import '../styles/style.css';

function ProductForm({ onProductAdded }) {
  const [formData, setFormData] = useState({
    productName: "",
    sellerName: "",
    price: "",
    details: "",
    imageUrl: "",
  });

  const [loading, setLoading] = useState(false);
  const [formVisible, setFormVisible] = useState(false);

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setLoading(true);
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "abc1234");

    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dz15xegcp/image/upload",
        {
          method: "POST",
          body: data,
        }
      );

      // Check if response is OK before parsing
      if (!res.ok) {
        const errorText = await res.text(); // Read response as text
        throw new Error(`Cloudinary Error: ${errorText}`);
      }

      const result = await res.json();
      setFormData({ ...formData, imageUrl: result.secure_url });
    } catch (error) {
      console.error("Image upload failed:", error.message);
      alert("Image upload failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.imageUrl) {
      alert("Please upload an image first.");
      return;
    }

    try {
      const response = await fetch("http://localhost:4000/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const toggleFormVisibility = () => {
        setFormVisible(!formVisible);
      };

      // Ensure response is valid JSON
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        const text = await response.text();
        throw new Error(`Unexpected response: ${text}`);
      }

      const data = await response.json();

      if (response.ok) {
        alert("Product added successfully!");
        setFormData({
          productName: "",
          sellerName: "",
          price: "",
          details: "",
          imageUrl: "",
        });

        // Call the parent function to update the product list
        if (onProductAdded) {
          onProductAdded();  // Trigger re-fetch in parent component
        }

        // Hide the form after submission
        toggleFormVisibility();
      } else {
        alert(`Failed to add product: ${data.message || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Failed to add product:", error.message);
      alert("Something went wrong while adding the product.");
    }
  };

  return (
    <div>
      {/* Box that is visible initially */}
      <div className="product-form-container" onClick={() => setFormVisible(!formVisible)}>
        <h2>Add Product</h2>
      </div>

      {/* The form that appears when clicking on the "Add Product" box */}
      <div className="product-form" style={{ display: formVisible ? "block" : "none" }}>
        <h2>Add Product</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="productName"
            placeholder="Product Name"
            value={formData.productName}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="sellerName"
            placeholder="Seller Name"
            value={formData.sellerName}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
            required
          />
          <textarea
            name="details"
            placeholder="Product Details"
            value={formData.details}
            onChange={handleChange}
            required
          ></textarea>
          <input type="file" onChange={handleImageUpload} required />
          {loading ? (
            <p>Uploading image...</p>
          ) : (
            formData.imageUrl && <img src={formData.imageUrl} alt="Product" style={{ width: "100px" }} />
          )}
          <button type="submit" disabled={loading}>
            {loading ? "Uploading..." : "Add Product"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ProductForm;
