import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { login } from "./store/slices/authSlice";
import { useDispatch } from "react-redux";
import Home from "./pages/Home";
import Login from "./pages/Login";

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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
