import React, { useState } from "react";
import { Button } from "../components/ui/Button";
import { uploadImage } from "../api/uploader";
import useProducts from "../hooks/useProducts";
// import { addNewProduct } from "../api/firebase";
// import {
//   useMutation,
//   useQueryClient,
//   //QueryClient,
// } from "@tanstack/react-query";

export const NewProduct = () => {
  const [product, setProduct] = useState({});
  const [file, setFile] = useState();
  const [isuploading, setIsUploading] = useState(false);
  const [success, setSuccess] = useState();

  //뮤테이션 생성 / (생성후 -> 아래 handleSubmit 함수안에 -> uploadImage함수 안에서 사용함)
  //const queryClient = useQueryClient();

  // const addProduct = useMutation(
  //   //{product, url} 을 인자로 받고, 서버에 addNewProduct함수 호출후(api호출)즉, 데이터 변경은 서버에서 할일...
  //   ({ product, url }) => addNewProduct(product, url),
  //   {
  //     //그리고 뮤테이션이 성공적으로 되면,invalidate캐시를 하는데, 뭐 다하는건 아니고, "product"라는 키를 가진 캐시를 invalidate 한다고 설정하면됨.
  //     onSuccess: () =>
  //       queryClient.invalidateQueries({ queryKey: ["products"] }),
  //     //onSuccess: () => queryClient.invalidateQueries(["products"]),
  //   }
  //   // 추가 설명을 하자면,
  //   // 어떤 웹 페이지에 데이터를 보여주고 있다면, 보여주고 있는 데이터는 캐시가 되어있다.
  //   // 그리고 또 어떤 다른 웹 페이지에서는, 저 보여주는 데이터를 수정하고 있다.
  //   // 즉, 수정(뮤테이션을)을 한 경우, 캐시된 정보가 여전이 화면에 나오고 있어서,
  //   // 즉, 화면이 안바뀌는게 문제인데,
  //   // 수동 적으로, queryClient.invalidateQueries 를 해줘서,
  //   // "product"를 가진 데이터를 업데이트 해라. 라고 해주면,
  //   // 자동으로 업데이트 해주고, 데이터가 변경이 되기때매,
  //   // 화면(페이지)에서도 즉각적인 업데이트가 일어난다.
  // );

  // const addProduct = useMutation({
  //   mutationFn: ({ product, url }) => addNewProduct(product, url),
  //   onSuccess: () => queryClient.invalidateQueries(["products"]),
  //   //onSuccess: () => queryClient.invalidateQueries({ queryKey: ["products"] }),
  // });

  //Hooks
  const { addProduct } = useProducts();

  //input / onChange
  const handleChange = (e) => {
    //console.log("handleChange");
    //console.log(e.target);
    const { name, value, files } = e.target;
    if (name === "file") {
      setFile(files && files[0]);
      //console.log(files[0]);
      return;
    }
    setProduct((product) => ({ ...product, [name]: value }));
  };

  //Form / Submit
  const handleSubmit = (e) => {
    //console.log("handleSubmit");
    e.preventDefault();

    //버튼 상태(업로딩 메세지)
    setIsUploading(true);

    // 제품의 사진을 Cloudinary에 업로드 하고 URL을 획득.
    // Firebase에 새로운 제품을 추가.
    uploadImage(file) //
      .then((url) => {
        //console.log(url);

        //뮤테이션 사용 addProduct.mutate() / { product, url } 를 인자로 전달해줌.
        // 즉, addNewProduct을 바로 사용하는것이 아니고,
        // 위에서 뮤테이션으로 addNewProduct를 넣고, onSuccess로 이후 성공적 메세지 처리까지 여기서 해줄 수 있음.
        // 즉, 그 뮤테이션을 여기서 사용해줌.
        addProduct.mutate(
          { product, url },
          {
            onSuccess: () => {
              setSuccess("성공적으로 제품이 추가 되었습니다.");
              setTimeout(() => {
                setSuccess(null);
              }, 4000);
            },
          }
        );

        // // Firebase에 새로운 제품을 추가부분 시작.
        // addNewProduct(product, url) //
        //   .then(() => {});
        // // Firebase에 새로운 제품을 추가부분 끝.
      })
      .finally(() => setIsUploading(false));
  };

  return (
    <section className="w-full text-center">
      <h2 className="text-2xl font-bold my-4">새로운 제품 등록</h2>
      {success && <p className="my-2">✅{success}</p>}
      {file && (
        <img
          className="w-96 mx-auto mb-2"
          src={URL.createObjectURL(file)}
          alt="local file"
        />
      )}
      <form className="flex flex-col px-12" onSubmit={handleSubmit}>
        <input
          type="file"
          accept="image/*"
          name="file"
          required
          onChange={handleChange}
        />
        <input
          type="text"
          name="title"
          value={product.title ?? ""}
          placeholder="제품명"
          required
          onChange={handleChange}
        />
        <input
          type="number"
          name="price"
          value={product.price ?? ""}
          placeholder="가격"
          required
          onChange={handleChange}
        />
        <input
          type="text"
          name="category"
          value={product.category ?? ""}
          placeholder="카테고리"
          required
          onChange={handleChange}
        />
        <input
          type="text"
          name="description"
          value={product.description ?? ""}
          placeholder="제품 설명"
          required
          onChange={handleChange}
        />
        <input
          type="text"
          name="options"
          value={product.options ?? ""}
          placeholder="옵션들(콤마(,)로 구분)"
          required
          onChange={handleChange}
        />
        <Button
          text={isuploading ? "업로드중..." : "제품 등록하기"}
          disabled={isuploading}
        />
      </form>
    </section>
  );
};
