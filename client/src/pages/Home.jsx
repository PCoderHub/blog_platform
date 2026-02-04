import React from "react";
import { logoutUser } from "../api/services/userServices";
import ReaderHome from "../components/ReaderHome";
import AuthorHome from "../components/AuthorHome";

function Home({ setIsAuthenticated }) {
  const user = JSON.parse(localStorage.getItem("user"));
  const handleLogout = async () => {
    try {
      const response = await logoutUser();
      console.log(response.data.message);
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setIsAuthenticated(false);
    } catch (error) {
      console.error(error.response.data.message);
    }
  };

  return (
    <div className="flex">
      <div className="w-full md:w-1/4 flex md:flex-col justify-around md:items-center p-1 md:border md:m-2 rounded-lg">
        <div className="text-center">
          <p className="text-red-800 font-bold">{user.name}</p>
          <p className="italic text-blue-800">{user.email}</p>
        </div>
        <button
          className="bg-red-500 p-1 md:p-3 md:w-1/2 md:mt-2 text-white rounded-lg text-sm"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
      {user.role === "reader" && <ReaderHome />}
      {user.role === "author" && <AuthorHome />}
    </div>
  );
}

export default Home;
