import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuthContext } from "../context/AuthContext";
import { addOrUpdateToCart, getCart, removeFromCart } from "../api/firebase";

export default function useCart() {
  const { uid } = useAuthContext();
  const queryClient = useQueryClient();

  // myCart 컴포넌트 부분,
  //carts 전체로 받아온것을 캐싱하는것이 아니고,
  //carts인데 사용자별로 캐시가 이루어지도록 uid를 설정!
  //그리고 사용자가 없는경우 null이므로,
  // enabled 옵션을 사용해서, uid가 존재하는경우에만 이api쿼리를 사용하도록함.
  const cartQuery = useQuery({
    queryKey: ["carts", uid || ""],
    queryFn: () => getCart(uid),
    enabled: !!uid,
  });

  //CartItem 컴포넌트,
  //add, update
  const addOrUpdateItem = useMutation({
    mutationFn: (product) => addOrUpdateToCart(uid, product),
    onSuccess: () => queryClient.invalidateQueries(["carts", uid]),
  });

  //remove
  const removeItem = useMutation({
    mutationFn: (id) => removeFromCart(uid, id),
    onSuccess: () => queryClient.invalidateQueries(["carts", uid]),
  });

  // return
  return { cartQuery, addOrUpdateItem, removeItem };
}
