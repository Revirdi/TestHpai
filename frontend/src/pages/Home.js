import Navigation from "../components/Navigation";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import UserCards from "../components/UserCards";
import axiosInstance from "../services/axios";
import { useEffect, useState } from "react";

function Home() {
  const { name, accessToken, user_id, roles } = useSelector(
    (state) => state.auth
  );
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${accessToken}` },
      };
      const resGetUser = await axiosInstance.get("/api/users", config);
      const result = resGetUser.data.data;
      setUsers(result);
    } catch (error) {
      console.log(error);
    }
  };

  const renderUsers = () => {
    return users.map((user) => {
      return (
        <UserCards
          key={user.user_id}
          user={user}
          onDeleteHandler={onDeleteHandler}
        />
      );
    });
  };

  const onDeleteHandler = async (user) => {
    try {
      if (roles != "admin")
        return alert("Hanya admin yang bisa menghapus data");
      if (user.user_id == user_id)
        return alert("tidak bisa menghapus diri sendiri");
      const getLocalStorage = localStorage.getItem("userInfo");
      const { accessToken } = JSON.parse(getLocalStorage);
      const config = {
        headers: { Authorization: `Bearer ${accessToken}` },
      };

      const resDeleteUser = await axiosInstance.delete(
        `/api/users/${user.user_id}`,
        config
      );
      fetchUser();
      alert(resDeleteUser?.data?.message);
    } catch (error) {
      console.log(error);
      alert(error?.resDeleteUser?.data?.message);
    }
  };

  if (!name) return <Navigate to="/login" replace />;

  return (
    <>
      <Navigation />

      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl my-4">User List : </h1>

        <div className="inline-flex flex-col">{renderUsers()}</div>
      </div>
    </>
  );
}

export default Home;
