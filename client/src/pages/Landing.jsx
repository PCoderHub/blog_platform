import React, { useState } from "react";
import Register from "../components/Register";
import Login from "../components/Login";

function Landing({ setIsAuthenticated }) {
  const [login, setLogin] = useState(false);
  return (
    <div className="container mx-auto p-4">
      <div className="rounded-lg bg-red-100 h-[70vh] flex flex-col items-center justify-around m-3 hover:scale-102">
        <h1 className="text-blue-800 text-3xl">
          Welcome to Katha. Give life to your stories. Get insights from our
          readers...
        </h1>

        {login && (
          <Login setLogin={setLogin} setIsAuthenticated={setIsAuthenticated} />
        )}
        {!login && <Register setLogin={setLogin} />}
      </div>
    </div>
  );
}

export default Landing;
