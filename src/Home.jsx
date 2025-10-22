import React, { useEffect, useState } from "react";
import Navbar from "./component/Navbar";
import Card from "./component/Card";

function Home() {
  const [products, setProducts] = useState([]);

  const fetchStoreProducts = async () => {
    try {
      const res = await fetch("https://fakestoreapi.com/products");
      const data = await res.json();
      console.log("Fake store data:", data);
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } 
  };0

  useEffect(() => {
    fetchStoreProducts();
  }, []);

  return (
    <div className="w-full min-h-screen bg-gray-100">
    
      <div className="w-full h-[12vh]">
        <Navbar />
      </div>

     
      <div className="flex flex-wrap justify-center gap-6 p-6">
        {products.map((item) => (
          <Card
          id={item.id}
            key={item.id}
            title={item.title}
            price={item.price}
            image={item.image}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;
