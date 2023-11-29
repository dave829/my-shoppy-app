import React from "react";
import { useNavigate } from "react-router-dom";

export const ProductCard = ({
  product,
  product: { id, image, title, category, price },
}) => {
  const navigate = useNavigate();

  return (
    <li
      onClick={() => navigate(`/products/${id}`, { state: { product } })}
      className="rounded-lg shodow-md overflow-hidden cursor-pointer transition-all hover:scale-105"
    >
      <img className="w-full" src={image} alt={title} />
      <div className="cursor-pointer mt-2 px-2 text-lg flex justify-between items-center">
        <h3>{title}</h3>
        <p className="truncate">{`원${price}`}</p>
      </div>
      <p className="mb-2 px-2 text-gray-600">{category}</p>
    </li>
  );
};
