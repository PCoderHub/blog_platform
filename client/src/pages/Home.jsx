import React from "react";
import { logoutUser } from "../api/services/userServices";

function Home({ setIsAuthenticated }) {
  const handleLogout = async () => {
    try {
      const response = await logoutUser();
      console.log(response.data.message);
      localStorage.removeItem("token");
      setIsAuthenticated(false);
    } catch (error) {
      console.error(error.response.data.message);
    }
  };

  return (
    <div>
      Home
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Home;
