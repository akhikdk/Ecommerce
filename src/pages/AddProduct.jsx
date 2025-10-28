import React, { useState, useEffect } from "react";

function AddProduct() {
  const [formData, setFormData] = useState({
    Id: "",
    Title: "",
    Price: "",
    Image: "",
  });

  const [message, setMessage] = useState("");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:7070/api/products");
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:7070/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
        setProducts((prev) => [...prev, data.product]); // update instantly
        setFormData({ Id: "", Title: "", Price: "", Image: "" });
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      console.error("Error adding product:", error);
      setMessage("Failed to add product.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;

    try {
      const response = await fetch(`http://localhost:7070/api/products/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);

        setProducts((prev) => prev.filter((p) => p.Id !== id));
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      setMessage("Failed to delete product.");
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-300 flex flex-col items-center py-10">
      <div className="w-[80%] md:w-[50%] lg:w-[30%] bg-white rounded-xl shadow-xl flex flex-col items-center justify-center p-6 mb-8">
        <h1 className="text-2xl font-bold mb-6">Add Product</h1>

        <form
          onSubmit={handleSubmit}
          className="w-full flex flex-col items-center"
        >
          <input
            type="text"
            name="Id"
            placeholder="Id"
            value={formData.Id}
            onChange={handleChange}
            className="w-[80%] h-[3rem] border border-gray-400 rounded-lg py-2 px-3 mb-4"
          />

          <input
            type="text"
            name="Title"
            placeholder="Title"
            value={formData.Title}
            onChange={handleChange}
            className="w-[80%] h-[3rem] border border-gray-400 rounded-lg py-2 px-3 mb-4"
          />

          <input
            type="text"
            name="Price"
            placeholder="Price"
            value={formData.Price}
            onChange={handleChange}
            className="w-[80%] h-[3rem] border border-gray-400 rounded-lg py-2 px-3 mb-4"
          />

          <textarea
            name="Image"
            placeholder="Image URL"
            value={formData.Image}
            onChange={handleChange}
            className="w-[80%] h-[6rem] border border-gray-400 rounded-xl py-2 px-3 resize-none mb-4"
          ></textarea>

          <button
            type="submit"
            className="w-[50%] h-[3rem] bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition"
          >
            Add
          </button>
        </form>

        {message && <p className="mt-4 text-center text-gray-700">{message}</p>}
      </div>

      <div className="w-[90%] md:w-[70%] lg:w-[60%] bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-bold mb-4">Product List</h2>

        {products.length === 0 ? (
          <p className="text-gray-500">No products available.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <div
                key={product.Id}
                className="border rounded-lg p-4 shadow-sm relative"
              >
                <img
                  src={product.Image}
                  alt={product.Title}
                  className="w-full h-40 object-cover rounded-md mb-2"
                />
                <h3 className="font-semibold text-lg">{product.Title}</h3>
                <p className="text-gray-600">Price: {product.Price}</p>
                <p className="text-gray-400 text-sm mb-3">ID: {product.Id}</p>

                <button
                  onClick={() => handleDelete(product.Id)}
                  className="absolute top-2 right-2 bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-700 transition"
                  title="Delete"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default AddProduct;
