import React, { useState } from "react";
import Register from "../components/Register";
import Login from "../components/Login";

function Landing({ setIsAuthenticated }) {
  const [login, setLogin] = useState(false);
  return (
    <div className="container mx-auto p-1 md:p-5">
      <div className="min-h-[70vh] md:bg-red-100 md:rounded-lg md:p-5 flex flex-col items-center justify-around">
        <h1 className="text-blue-800 text-lg md:text-3xl my-2">
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
