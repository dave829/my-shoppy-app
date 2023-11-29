import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addNewProduct, getProducts as fetchProducts } from "../api/firebase";

// 스테일타임이 있고, 그럼 자연스래 따라오는,
//밑에 invalidateQueries 를 설정해야하는 것을 한눈에 볼수있는
// 이런 훅스를 만들어 쓰면 관리가 좋다. 왜? 코드를 한눈에 보고 파악을 하니까
// 그리고 내부 구현사항을 따로 컴포넌트별로 갖는게아니고, GET / ADD 이런식으로 분리해서 여기 모아서 관리.
export default function useProducts() {
  const queryClient = useQueryClient();

  //GET
  const productsQuery = useQuery({
    queryKey: ["products"], //동일한 캐시 키
    queryFn: fetchProducts, // 데이터 읽어오기
    staleTime: 1000 * 60, //스테일타임이 있고, 그럼 자연스래 따라오는, 밑에 invalidateQueries 를 설정해야하는 것을 한눈에 볼수있는
  });

  //ADD
  const addProduct = useMutation({
    mutationFn: ({ product, url }) => addNewProduct(product, url), //데이터 업데이트
    onSuccess: () => queryClient.invalidateQueries(["products"]), //동일한 캐시 키
  });

  // return
  return { productsQuery, addProduct };
}
