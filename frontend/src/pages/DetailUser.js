import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import Navigation from "../components/Navigation";

import axiosInstance from "../services/axios";

function DetailUser() {
  const { user_id } = useParams();
  const [user, setUser] = useState();

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const getLocalStorage = localStorage.getItem("userInfo");
      const { accessToken } = JSON.parse(getLocalStorage);
      const config = {
        headers: { Authorization: `Bearer ${accessToken}` },
      };
      const resGetUser = await axiosInstance.get(
        `/api/users/${user_id}`,
        config
      );
      const result = resGetUser.data.data[0];
      setUser(result);
    } catch (error) {
      alert("terjadi kesalahan disisi server");
    }
  };

  return (
    <>
      <Navigation />
      <div class="flex flex-col">
        <div class="overflow-x-auto ">
          <div class="py-2 mt-10 mx-auto w-6/12">
            <div class="overflow-hidden">
              <table class="min-w-full">
                <thead class="bg-white border-b">
                  <tr>
                    <th
                      scope="col"
                      class="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      Nama
                    </th>
                    <th
                      scope="col"
                      class="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      Email
                    </th>
                    <th
                      scope="col"
                      class="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      Role
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="bg-gray-100 border-b">
                    <td class="text-lg text-gray-900 font-semibold px-6 py-4 whitespace-nowrap">
                      {user?.name}
                    </td>
                    <td class="text-lg text-gray-900 font-semibold px-6 py-4 whitespace-nowrap">
                      {user?.email}
                    </td>
                    <td class="text-lg text-gray-900 font-semibold px-6 py-4 whitespace-nowrap">
                      {user?.roles}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DetailUser;
