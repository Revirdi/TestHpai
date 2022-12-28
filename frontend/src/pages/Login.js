import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import axiosInstance from "../services/axios";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../store/slices/authSlice";

function Login() {
  const [formState, setFormState] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const name = useSelector((state) => state.auth.name);

  const onHandleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const onLoginHandler = async (e) => {
    e.preventDefault();
    try {
      const resGetUser = await axiosInstance.post("api/login", formState);

      const user = resGetUser.data.data;
      dispatch(login(user));

      const strUser = JSON.stringify(user);
      localStorage.setItem("userInfo", strUser);
    } catch (error) {
      console.log(error?.response?.data?.message);
    }
  };

  if (name) return <Navigate to="/" replace />;
  return (
    <section class="h-screen">
      <div class="px-6 h-full text-gray-800">
        <div class="flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full g-6">
          <div class="grow-0 shrink-1 md:shrink-0 basis-auto xl:w-5/12 lg:w-5/12 md:w-9/12 mb-12 md:mb-0">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
              class="w-full"
              alt="Sample image"
            />
          </div>
          <div class="xl:ml-20 xl:w-4/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0">
            <form onSubmit={onLoginHandler}>
              <div class="mb-4 text-center text-xl">Sign In</div>

              <div class="mb-6">
                <input
                  name="email"
                  type="text"
                  class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  id="exampleFormControlInput2"
                  placeholder="Email address"
                  onChange={onHandleChange}
                />
              </div>

              <div class="mb-6">
                <input
                  name="password"
                  type="password"
                  class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  id="exampleFormControlInput2"
                  placeholder="Password"
                  onChange={onHandleChange}
                />
              </div>

              <div class="text-center ">
                <button
                  type="submit"
                  // onClick={onLoginHandler}
                  class="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
