import React from "react";
import { AiOutlineMinusSquare } from "react-icons/ai";
import { AiOutlinePlusSquare } from "react-icons/ai";
import { RiDeleteBin5Fill } from "react-icons/ri";
//import { addOrUpdateToCart, removeFromCart } from "../api/firebase";
import useCart from "../hooks/useCart";

const ICON_CLASS =
  "transition-all cursor-pointer hover: text-brand hover:scale-105 mx-1";

export const CartItem = ({
  product,
  product: { id, image, title, option, quantity, price },
}) => {
  const { addOrUpdateItem, removeItem } = useCart();

  //minus
  const handleMinus = () => {
    if (quantity < 2) return;
    addOrUpdateItem.mutate({ ...product, quantity: quantity - 1 });
  };

  //plus
  const handlePlus = () =>
    addOrUpdateItem.mutate({ ...product, quantity: quantity + 1 });

  //delete
  const handleDelete = () => removeItem.mutate(id);

  return (
    <li className="flex justify-between my-2 items-center">
      <img className="w-24 md:w-48 rounded-lg" src={image} alt="title" />
      <div className="flex-1 flex justify-between ml-4">
        <div className="basis-3/5">
          <p className="text-lg">제품명 : {title}</p>
          <p className="text-xl font-bold text-brand">사이즈 : {option}</p>
          <p>가격 : {price}원</p>
        </div>
        <div className="text-2xl flex items-center">
          <AiOutlineMinusSquare className={ICON_CLASS} onClick={handleMinus} />
          <span>수량 : {quantity}</span>
          <AiOutlinePlusSquare className={ICON_CLASS} onClick={handlePlus} />
          <RiDeleteBin5Fill className={ICON_CLASS} onClick={handleDelete} />
        </div>
      </div>
    </li>
  );
};
