// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getDatabase, ref, get, set, remove } from "firebase/database";

import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

import { v4 as uuid } from "uuid";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
};

const app = initializeApp(firebaseConfig);

// google Auth
const auth = getAuth();
const provider = new GoogleAuthProvider();

// db
const database = getDatabase(app);

//로그인
export function login() {
  // return (
  return (
    signInWithPopup(auth, provider)
      // .then((result) => {
      //   // This gives you a Google Access Token. You can use it to access the Google API.
      //   const credential = GoogleAuthProvider.credentialFromResult(result);
      //   const token = credential.accessToken;
      //   // The signed-in user info.
      //   const user = result.user;
      //   //console.log(user);
      //   return user;
      // })
      .catch(console.error)
  );
  //);
  //   .catch((error) => {
  //   // Handle Errors here.
  //   const errorCode = error.code;
  //   const errorMessage = error.message;
  //   // The email of the user's account used.
  //   const email = error.customData.email;
  //   // The AuthCredential type that was used.
  //   const credential = GoogleAuthProvider.credentialFromError(error);
  //   // ...
  // });
}

//로그아웃
export function logout() {
  //const auth = getAuth();
  //return signOut(auth).then(() => null);

  return (
    signOut(auth)
      //
      .catch(console.error)
  );
}

// const auth = getAuth();
// signOut(auth)
//   .then(() => {
//     // Sign-out successful.
//   })
//   .catch((error) => {
//     // An error happened.
//   });

//사용자 상태
export function onUserStateChange(callback) {
  onAuthStateChanged(auth, async (user) => {
    // user && adminUser(user);
    // console.log(user);

    // 1. 사용자가 있는 경우 (로그인 한 경우) / 사용자 있으면 adminUser(user) / 없으면 null
    const updatedUser = user ? await adminUser(user) : null;
    // 그리고 콜백에는 updatedUser 준다.
    callback(updatedUser);
  });
}

//어드민
async function adminUser(user) {
  return get(ref(database, "admins")) //
    .then((snapshot) => {
      if (snapshot.exists()) {
        // 2. 사용자가 어드민(어드민 권한을 가지고 있는지)인지 확인.
        const admins = snapshot.val();
        const isAdmin = admins.includes(user.uid); //즉, 문자열 일치 여부 boolean 값
        //console.log(isAdmin);
        // 3. 사용자에게 알려주면 됨 즉, {...user, isAdmin: true/false} 어드민이면 true 아니면 false
        return { ...user, isAdmin };
      }
      return user;
    });
}

//새로운 상품 추가
export async function addNewProduct(product, imageUrl) {
  const id = uuid();
  return set(ref(database, `products/${id}`), {
    ...product,
    id,
    price: parseInt(product.price),
    image: imageUrl,
    options: product.options.split(","),
  });
}

//상품 Get(Reading)
export async function getProducts() {
  return get(ref(database, "products")) //
    .then((snapshot) => {
      if (snapshot.exists()) {
        return Object.values(snapshot.val());
      }
      return [];
    });
}

// Get 카트 (Read)
export async function getCart(userId) {
  return get(ref(database, `carts/${userId}`)) //
    .then((snapshot) => {
      const items = snapshot.val() || {};
      //console.log(items);
      return Object.values(items);
    });
}

// Set 카트 (Create or Update)
export async function addOrUpdateToCart(userId, product) {
  return set(ref(database, `carts/${userId}/${product.id}`), product);
}

// remove 카트 (Delete)
export async function removeFromCart(userId, productId) {
  return remove(ref(database, `carts/${userId}/${productId}`));
}

/////////////////////////////////////////////////////////////////
// 지금,
// login, logout, onAuthStateChanged 구현을, (로직을)
// 적역 상태관리 라이브러리나, contextAPI에 담지 않은 이유는,
// 즉, 파이어베이스로 따로 뺀 이유는,

// context API 나 상태 관리 라이브러리에 따로 담는 조건은,
// 컴포넌트들 간에 프롭을 전달할때 많은 뎁스를 거쳐서 전달하는게
// 번거롭고 지저분해지기 떄문에 방지하고자 하기 떄문인데,

// 지금 지 조건을 충족시키지 않으므로,
// 즉,
// 로그인, 로그아웃 기능(함수가)이,
// 오직 Navbar 만이 아닌, 즉, 다른 컴포넌트 에서도 자주 쓰인다면,
// contextAPI나 전역상태관리 라이브러리에 넣어서 써도 되는데,
// 지금,
// 오직 Navbar 만이 한정적으로 쓰고 있다.
// 그러므로,

// 특히,
// contextAPI 는
// provider가 상위를 감싸고 있는 형태라서,
// 즉,
// contextAPI 에 등록된 것들이, 렌더링 될 떄마다
// contextAPI 값 또한 계속해서 불려지는 문제 떄문에,
// 성능에도 별로 않좋다.
