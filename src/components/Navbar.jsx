import { Link } from "react-router-dom";
import { FiShoppingBag } from "react-icons/fi";
import { BsFillPencilFill } from "react-icons/bs";
import { User } from "./User";
import { Button } from "./ui/Button";
import { useAuthContext } from "../context/AuthContext";
import { CartStatus } from "./ui/CartStatus";

export const Navbar = () => {
  const { user, login, logout } = useAuthContext();
  //console.log(user);

  // const [user, setUser] = useState<UserType | null>(null);
  // //console.log(user);

  // useEffect(() => {
  //   // onUserStateChange((user: User) => {
  //   //   //console.log(user);
  //   //   setUser(user);
  //   // });

  //   onUserStateChange((user: any) => {
  //     //console.log(user); // idAdmin 결과값 확인
  //     setUser(user);
  //   });
  // }, []);

  // 컴포넌트 마운트
  // useEffect 동작
  // onUserStateChanged 호출하면서 인자로 (user) => setUser(user) 콜백함수 전달
  // onAuthStateChanged 호출
  // onAuthStateChanged가 로그인 상태를 확인해 user객체 또는 null값을 가져옴
  // 확인된 user객체 또는 null값을 callback함수인 (user) => setUser(user)의 인자에 전달
  // setUser(user)에 user객체 또는 null값이 대입됨
  // 즉, 파이어베이스가 브라우져 쿠키쪽에 상태를 저장하고, 로그인 상태를 가지고 있고, 체크함

  // const handleLogin = () => {
  //   login();
  //   //.then((user: any) => setUser(user));
  // };

  // const handleLogout = () => {
  //   logout();
  //   //.then((user) => setUser(user));
  // };

  return (
    <header className="flex justify-between border-b border-gray-300 p-2">
      <Link to="/" className="flex items-center text-4xl text-brand">
        <FiShoppingBag />
        <h1>Shoppy</h1>
      </Link>
      <nav className="flex items-center gap-4 font-semibold">
        <Link to="/products">Products</Link>
        {user && (
          <Link to="/carts">
            <CartStatus />
          </Link>
        )}
        {user && user.isAdmin && (
          <Link to="/products/new" className="text-1xl">
            <BsFillPencilFill />
          </Link>
        )}
        {/* {console.log(user.isAdmin)} */}
        {user && <User user={user} />}
        {!user && <Button text={"Login"} onClick={login} />}
        {user && <Button text={"Logout"} onClick={logout} />}
      </nav>
    </header>
  );
};
