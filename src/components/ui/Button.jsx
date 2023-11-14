import React from "react";

export const Button = ({ text, onClick }) => {
  return (
    <button
      className="bg-brand py-2 text-white px-4 rounded-sm hover:brightness-110 "
      onClick={onClick}
    >
      {text}
    </button>
  );
};
