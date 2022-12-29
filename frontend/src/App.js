import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { login } from "./store/slices/authSlice";
import { useDispatch } from "react-redux";
import Home from "./pages/Home";
import Login from "./pages/Login";
import DetailUser from "./pages/DetailUser";
import AddUser from "./pages/AddUser";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const userLocalStorage = localStorage.getItem("userInfo");
    if (userLocalStorage) {
      const user = JSON.parse(userLocalStorage);
      const action = login(user);
      dispatch(action);
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/tambah" element={<AddUser />} />
        <Route path="/users/:user_id" element={<DetailUser />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
