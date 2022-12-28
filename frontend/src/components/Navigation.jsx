import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store/slices/authSlice";

function Navigation() {
  const { name } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  return <div>Navigation</div>;
}

export default Navigation;
