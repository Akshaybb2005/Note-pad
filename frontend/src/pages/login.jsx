import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Axios from "../Axios";
import { setUsers } from "../slices/userslice";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await Axios.post("/auth/login", formData);
      dispatch(setUsers(response.data.user));
      navigate("/profile");
    } catch (error) {
      console.log("Login error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl p-8">

        {/* Title */}
        <h1 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text text-transparent">
          Login
        </h1>

        {/* Subtitle */}
        <p className="text-zinc-400 text-center mb-8 text-sm font-mono">
          &lt;authenticate /&gt;
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">

          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            className="w-full px-4 py-3 bg-black border border-zinc-700 rounded-md
                       text-white placeholder-zinc-500 focus:outline-none
                       focus:ring-2 focus:ring-cyan-400 focus:border-transparent"
          />

          <input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            className="w-full px-4 py-3 bg-black border border-zinc-700 rounded-md
                       text-white placeholder-zinc-500 focus:outline-none
                       focus:ring-2 focus:ring-green-400 focus:border-transparent"
          />

          <button
            type="submit"
            className="w-full py-3 mt-2 rounded-md font-semibold
                       bg-gradient-to-r from-cyan-400 to-green-400
                       text-black hover:opacity-90 transition-all"
          >
            Login
          </button>
        </form>

        {/* Footer */}
        <p className="text-zinc-500 text-center text-sm mt-6 font-mono">
          Don&apos;t have an account?{" "}
          <span
            className="text-cyan-400 cursor-pointer hover:underline"
            onClick={() => navigate("/register")}
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;
