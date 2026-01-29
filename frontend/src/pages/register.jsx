import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Axios from "../Axios";
import { setUsers } from "../slices/userslice";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      const response = await Axios.post("/auth/register", formData);
      dispatch(setUsers(response.data.user));
      navigate("/login");
    } catch (error) {
      console.log("Registration error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl p-8">
        
        {/* Title */}
        <h1 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">
          Create Account
        </h1>

        {/* Subtitle */}
        <p className="text-zinc-400 text-center mb-8 text-sm font-mono">
          &lt;register your credentials /&gt;
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          
          <input
            type="text"
            placeholder="Username"
            value={formData.name}
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
            className="w-full px-4 py-3 bg-black border border-zinc-700 rounded-md
                       text-white placeholder-zinc-500 focus:outline-none
                       focus:ring-2 focus:ring-green-400 focus:border-transparent"
          />

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
                       focus:ring-2 focus:ring-purple-400 focus:border-transparent"
          />

          <button
            type="submit"
            className="w-full py-3 mt-2 rounded-md font-semibold
                       bg-gradient-to-r from-green-400 to-cyan-400
                       text-black hover:opacity-90 transition-all"
          >
            Register
          </button>
        </form>

        {/* Footer */}
        <p className="text-zinc-500 text-center text-sm mt-6 font-mono">
          Already have an account?{" "}
          <span
            className="text-green-400 cursor-pointer hover:underline"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}

export default Register;
