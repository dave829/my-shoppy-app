// import React from "react";
// import { useQuery } from "@tanstack/react-query";
// import { getProducts } from "../api/firebase";
import { ProductCard } from "./ProductCard";
import useProducts from "../hooks/useProducts";

export const Products = () => {
  // const {
  //   isLoading,
  //   error,
  //   data: products,
  // } = useQuery({
  //   queryKey: ["products"],
  //   queryFn: getProducts,
  //   staleTime: 1000 * 60,
  // });

  //Hooks
  const {
    productsQuery: { isLoading, error, data: products }, //낱개로 풀어서 쓴다.
  } = useProducts();

  return (
    <>
      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <ul className="grid grid-cols-1 md:grid-cols-3 lg-grid-cols-4 gap-4 p-4">
        {products &&
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </ul>
    </>
  );
};
