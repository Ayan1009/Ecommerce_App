import React, { useEffect, useState } from "react";
import Product from "../components/auth/Product";
import NavBar from "../components/auth/nav";
import axios from "../axiosConfig";
import { mockProducts } from "../mockData";

export default function Home() {
const [products, setProducts] = useState([]);
const [loading, setLoading] = useState(true); // For loading state
const [error, setError] = useState(null); // For error handling

useEffect(() => {
  axios.get("/api/v2/product/get-products",{withCredentials: true,})
    .then((res) => {
      setProducts(res.data.products);
      setLoading(false);
    })
    .catch((err) => {
      console.error("Error fetching products:", err);
      console.log("Using mock data for development...");
      // Use mock data for development when API is not accessible
      setProducts(mockProducts);
      setLoading(false);
      // Don't set error state, just use mock data
    });
}, []);
if (loading) {
  return (
    <div className="text-center text-white mt-10">Loading products...</div>
  );
}
if (error) {
  return (
    <div className="text-center text-red-500 mt-10 p-4">
      <h2 className="text-xl font-bold mb-2">Connection Error</h2>
      <p className="mb-2">Unable to connect to the server. This might be due to:</p>
      <ul className="text-sm text-left max-w-md mx-auto mb-4">
        <li>• CORS policy restrictions</li>
        <li>• Server being temporarily unavailable</li>
        <li>• Network connectivity issues</li>
      </ul>
      <p className="text-xs text-gray-400">Error details: {error}</p>
      <button 
        onClick={() => window.location.reload()} 
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Retry
      </button>
    </div>
  );
}

  return (
    <>
      <NavBar />
      <div className="w-full min-h-screen bg-neutral-800">
        <h1 className="text-3xl text-center text-white py-6">Product Gallery</h1>
        {products.length > 0 && products[0]._id === "1" && (
          <div className="bg-yellow-500 text-black text-center py-2 px-4 mx-4 rounded">
            🚧 Development Mode: Using mock data (CORS issue with backend)
          </div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 p-4">
          {products.map((product) => (
            <Product key={product._id} {...product} />
          ))}
        </div>
      </div>
    </>
  );
}