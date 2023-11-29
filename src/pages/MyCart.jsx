import React from "react";
//import { useQuery } from "@tanstack/react-query";
import { BsFillPlusCircleFill } from "react-icons/bs";
//import { getCart } from "../api/firebase";
//import { useAuthContext } from "../context/AuthContext";
import { CartItem } from "../components/CartItem";
import { PriceCard } from "../components/PriceCard";
import { FaEquals } from "react-icons/fa";
import { Button } from "../components/ui/Button";
import useCart from "../hooks/useCart";

const SHIPPING = 3000;

export const MyCart = () => {
  //const { uid } = useAuthContext();
  // const { isLoading, data: products } = useQuery({
  //   queryKey: ["carts"],
  //   queryFn: () => getCart(uid),
  // });
  //console.log(products);

  const {
    cartQuery: { isLoading, data: products },
  } = useCart();

  if (isLoading) return <p>Loading...</p>;

  const hasProducts = products && products.length > 0;

  const totalPrice =
    products &&
    products.reduce(
      (prev, current) => prev + parseInt(current.price) * current.quantity,
      0
    );

  return (
    <section className="p-8 flex flex-col">
      <p className="text-2xl text-center font-bold pb-4 border-b border-gray-300">
        내 장바구니
      </p>
      {!hasProducts && <p>장바구니에 상품이 없습니다.</p>}
      {hasProducts && (
        <>
          <ul className="border-b border-gray-300 mb-8 p-4 px-8">
            {products.map((product) => (
              <CartItem key={product.id} product={product} />
            ))}
          </ul>
          <div className="flex justify-between mb-8 items-center px-2 md:px-8 lg:px-16">
            <PriceCard text="상품 총액" price={totalPrice} />
            <BsFillPlusCircleFill className="shrink-0" />
            <PriceCard text="배송액" price={SHIPPING} />
            <FaEquals className="shrink-0" />
            <PriceCard text="총 가격" price={totalPrice + SHIPPING} />
          </div>
          <Button text="주문하기" />
        </>
      )}
    </section>
  );
};
