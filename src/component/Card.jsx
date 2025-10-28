import React from "react";

function Card({ id, title, price, image, onDelete }) {
  return (
    <div className="w-64 bg-white rounded-xl shadow-lg p-4 relative hover:shadow-2xl transition">
      {/* Delete Button */}
      <button
        onClick={() => onDelete(id)}
        className="absolute top-2 right-2 bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-700 transition"
        title="Delete product"
      >
        ✕
      </button>

      <img
        src={image}
        alt={title}
        className="w-full h-40 object-cover rounded-md mb-3"
      />
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-gray-700 mb-2">Price: ${price}</p>
      <p className="text-sm text-gray-400">ID: {id}</p>
    </div>
  );
}

export default Card;
