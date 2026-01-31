import React, { useState } from "react";
import { registerUser } from "../api/services/userServices";

function Register({ setLogin }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("reader");

  const handleChange = (e) => {
    setRole(e.target.value);
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    const userData = {
      name,
      email,
      password,
      role,
    };

    try {
      const response = await registerUser(userData);
      console.log(response.data.message);
      setLogin(true);
    } catch (error) {
      console.error(error.response.data.message);
    }
  };

  return (
    <div className="w-1/3 mx-auto">
      <h1 className="text-center">Sign Up</h1>
      <form className="flex flex-col justify-center" onSubmit={handleRegister}>
        <input
          className="border rounded-lg p-2 m-2"
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
          required
        />
        <input
          className="border rounded-lg p-2 m-2"
          type="email"
          name="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter email"
          required
        />
        <input
          className="border rounded-lg p-2 m-2"
          type="password"
          name="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password"
          required
        />
        <label className="text-center">Role:</label>
        <div className="flex justify-around">
          <div>
            <input
              className="text-[#f7c602]"
              type="radio"
              name="role"
              id="reader"
              value="reader"
              checked={role === "reader"}
              onChange={handleChange}
            />
            <label htmlFor="reader">Read blogs</label>
          </div>
          <div>
            <input
              type="radio"
              name="role"
              id="author"
              value="author"
              checked={role === "author"}
              onChange={handleChange}
            />
            <label htmlFor="author">Post blogs</label>
          </div>
        </div>
        <p>
          Already have an account?{" "}
          <button className="text-red-500" onClick={() => setLogin(true)}>
            Login
          </button>
        </p>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;
