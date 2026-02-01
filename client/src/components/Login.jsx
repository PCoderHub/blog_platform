import React, { useState } from "react";
import { loginUser } from "../api/services/userServices";

function Login({ setLogin, setIsAuthenticated }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    const userData = {
      email,
      password,
    };

    try {
      const response = await loginUser(userData);
      console.log(response.data.message);
      localStorage.setItem("token", response.data.token);
      setIsAuthenticated(true);
    } catch (error) {
      console.error(error.response.data.message);
    }
  };

  return (
    <div className="md:bg-white md:rounded-lg md:w-1/3 md:p-5">
      <h1 className="text-center text-red-800 text-lg md:text-2xl font-bold">
        Sign In
      </h1>
      <form className="flex flex-col justify-center" onSubmit={handleLogin}>
        <input
          className="border border-[#f7c602] bg-white rounded-full p-2 m-2"
          type="email"
          name="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter email"
        />
        <input
          className="border border-[#f7c602] bg-white rounded-full p-2 m-2"
          type="password"
          name=""
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password"
        />
        <p>
          Don't have an account?{" "}
          <button
            className="text-red-500 hover:underline"
            onClick={() => setLogin(false)}
          >
            Register
          </button>
        </p>
        <button
          className="bg-[#f7c602] rounded-full p-2 w-1/2 mx-auto m-1"
          type="submit"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
