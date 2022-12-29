import { useState } from "react";
import Navigation from "../components/Navigation";
import axiosInstance from "../services/axios";

function AddUser() {
  const [userForm, setUserForm] = useState({
    name: "",
    email: "",
    password: "",
    roles: "",
  });

  const onChangeHandler = (e) => {
    setUserForm({ ...userForm, [e.target.name]: e.target.value });
  };

  const onClickHandler = async () => {
    try {
      const getLocalStorage = localStorage.getItem("userInfo");
      const { accessToken } = JSON.parse(getLocalStorage);
      const config = {
        headers: { Authorization: `Bearer ${accessToken}` },
      };

      const postUser = await axiosInstance.post("/api/users", userForm, config);

      alert(postUser?.data?.message);
      setUserForm({
        name: "",
        email: "",
        password: "",
        roles: "",
      });
    } catch (error) {
      console.log(error);
      alert(error?.response?.data?.message);
    }
  };

  return (
    <>
      <Navigation />
      <div class="p-5 w-6/12 mx-auto">
        <div class="mt-2">
          <div class="flex flex-row border-b border-gray-200 pb-4 mb-4">
            <div class="w-64 font-bold h-6 mx-2 mt-3 text-gray-800">
              Full Name
            </div>
            <div class="flex-1 flex flex-row">
              <div class="w-full flex-1 mx-2">
                <div class="my-2 p-1 bg-white flex border border-gray-200 rounded">
                  <input
                    name="name"
                    value={userForm.name}
                    placeholder="Full Name"
                    onChange={onChangeHandler}
                    class="p-1 px-2 appearance-none outline-none w-full text-gray-800 "
                  />{" "}
                </div>
              </div>
            </div>
          </div>
          <div class="flex flex-row border-b border-gray-200 pb-4 mb-4">
            <div class="w-64 font-bold h-6 mx-2 mt-3 text-gray-800">Email</div>
            <div class="flex-1 flex flex-row">
              <div class="w-full flex-1 mx-2">
                <div class="my-2 p-1 bg-white flex border border-gray-200 rounded">
                  <input
                    name="email"
                    placeholder="Email"
                    value={userForm.email}
                    onChange={onChangeHandler}
                    class="p-1 px-2 appearance-none outline-none w-full text-gray-800 "
                  />{" "}
                </div>
              </div>
            </div>
          </div>
          <div class="flex flex-row border-b border-gray-200 pb-4 mb-4">
            <div class="w-64 font-bold h-6 mx-2 mt-3 text-gray-800">Roles</div>
            <div class="flex-1 flex flex-row">
              <div class="w-full flex-1 mx-2">
                <div class="my-2 p-1 bg-white flex border border-gray-200 rounded">
                  <select
                    class="mx-2 flex-1 h-8 form-select w-full text-gray-800 "
                    name="roles"
                    value={userForm.roles}
                    onChange={onChangeHandler}
                  >
                    <option value="">Select Roles</option>
                    <option value="User">User</option>
                    <option value="Admin">Admin</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div class="flex flex-row border-b border-gray-200 pb-4 mb-4">
            <div class="w-64 font-bold h-6 mx-2 mt-3 text-gray-800">
              Password
            </div>
            <div class="flex-1 flex flex-row">
              <div class="w-full flex-1 mx-2">
                <div class="my-2 p-1 bg-white flex border border-gray-200 rounded">
                  <input
                    type="password"
                    name="password"
                    value={userForm.password}
                    onChange={onChangeHandler}
                    placeholder="Password"
                    class="p-1 px-2 appearance-none outline-none w-full text-gray-800 "
                  />{" "}
                </div>
              </div>
            </div>
          </div>

          <div class="flex flex-row">
            <div class="w-64 mx-2 font-bold h-6 mt-3 text-gray-800"></div>
            <div class="flex-1 flex flex-row">
              <button
                class="text-sm  mx-2 w-32  focus:outline-none flex justify-center px-4 py-2 rounded font-bold cursor-pointer 
        hover:bg-teal-700 hover:text-teal-100 
        bg-teal-100 
        text-teal-700 
        border duration-200 ease-in-out 
        border-teal-600 transition"
                onClick={onClickHandler}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddUser;
