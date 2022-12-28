import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store/slices/authSlice";

function Navigation() {
  const { name } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const onLogoutClick = () => {
    dispatch(logout());
    localStorage.removeItem("userInfo");
  };
  return (
    <nav className="bg-slate-300 shadow-lg">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center space-x-1 justify-between">
          <Link className="py-4 px-2 text-lg font-semibold">Home</Link>
          {name ? (
            <button
              className="py-1 px-2 text-lg font-semibold  border-red-500 rounded-md text-white hover:bg-red-700 bg-red-500 "
              onClick={onLogoutClick}
            >
              Logout
            </button>
          ) : null}
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
