import React, { useState } from "react";
import Home from "./Home";
import Landing from "./Landing";

function MainPage() {
  const token = localStorage.getItem("token");
  const [isAuthenticated, setIsAuthenticated] = useState(!!token);

  if (isAuthenticated) {
    return <Home setIsAuthenticated={setIsAuthenticated} />;
  } else {
    return <Landing setIsAuthenticated={setIsAuthenticated} />;
  }
}

export default MainPage;
