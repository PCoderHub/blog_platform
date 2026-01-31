import React, { useState } from "react";
import Register from "../components/Register";
import Login from "../components/Login";

function Landing({ setIsAuthenticated }) {
  const [login, setLogin] = useState(false);
  return (
    <div>
      Landing
      {login && (
        <Login setLogin={setLogin} setIsAuthenticated={setIsAuthenticated} />
      )}
      {!login && <Register setLogin={setLogin} />}
    </div>
  );
}

export default Landing;
