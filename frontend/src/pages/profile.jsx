import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Axios from "../Axios";
import { setUsers, logout } from "../slices/userslice";

function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Redux user
  const user = useSelector((state) => state.user.users);

  const [note, setNote] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  // Sync form data when user loads/changes
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
      });
    }
  }, [user]);

  // Load saved note
  useEffect(() => {
    const savedNote = localStorage.getItem("profile_note");
    if (savedNote) setNote(savedNote);
  }, []);

  // Auto-save note
  useEffect(() => {
    localStorage.setItem("profile_note", note);
  }, [note]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const response = await Axios.put("/auth/update", formData);
      dispatch(setUsers(response.data.user));
      setIsEditing(false);
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await Axios.post("/auth/logout");
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white px-4 py-10">
      <div className="max-w-5xl mx-auto space-y-8">

        {/* Profile Card */}
        <div className="relative bg-zinc-900 border border-zinc-800 rounded-xl p-6 shadow-xl">

          {/* Edit & Logout Buttons */}
          <div className="absolute top-4 right-4 flex gap-2">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="text-sm px-4 py-1.5 rounded-md border border-zinc-700
                         hover:bg-zinc-800 transition"
            >
              {isEditing ? "Cancel" : "Edit"}
            </button>

            <button
              onClick={handleLogout}
              className="text-sm px-4 py-1.5 rounded-md border border-red-500
                         text-red-400 hover:bg-red-500/10 transition"
            >
              Logout
            </button>
          </div>

          <h1 className="text-3xl font-bold bg-gradient-to-r from-green-400 to-cyan-400
                         bg-clip-text text-transparent mb-4">
            Profile
          </h1>

          <div className="space-y-3 font-mono text-zinc-300">

            {/* Name */}
            <div>
              <span className="text-zinc-500">Name:</span>{" "}
              {isEditing ? (
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="ml-2 bg-black border border-zinc-700
                             px-2 py-1 rounded text-green-400 focus:outline-none"
                />
              ) : (
                <span className="text-green-400">
                  {user?.name || "Anonymous"}
                </span>
              )}
            </div>

            {/* Email */}
            <div>
              <span className="text-zinc-500">Email:</span>{" "}
              {isEditing ? (
                <input
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="ml-2 bg-black border border-zinc-700
                             px-2 py-1 rounded text-cyan-400 focus:outline-none"
                />
              ) : (
                <span className="text-cyan-400">
                  {user?.email || "Not available"}
                </span>
              )}
            </div>

            {/* Save Button */}
            {isEditing && (
              <button
                onClick={handleSave}
                className="mt-4 px-5 py-2 rounded-md
                           bg-gradient-to-r from-green-400 to-cyan-400
                           text-black font-semibold hover:opacity-90"
              >
                Save Changes
              </button>
            )}
          </div>
        </div>

        {/* Developer Notepad */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 shadow-xl">
          <h2 className="text-xl font-semibold mb-3 font-mono text-purple-400">
            📝 Developer Notepad
          </h2>

          <p className="text-sm text-zinc-500 mb-3 font-mono">
            &lt;notes auto-saved locally /&gt;
          </p>

          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="// Write your notes, ideas, TODOs here..."
            className="w-full h-64 bg-black border border-zinc-700 rounded-md
                       p-4 text-zinc-200 font-mono resize-none
                       focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
        </div>

      </div>
    </div>
  );
}

export default Profile;
