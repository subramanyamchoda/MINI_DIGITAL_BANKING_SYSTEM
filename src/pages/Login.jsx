import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FaLock,
  FaUser,
  FaUserShield
} from "react-icons/fa";

export default function Login() {

  const [form, setForm] = useState({
    email: "",
    password: "",
    role: "user",
  });

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRoleChange = (role) => {
    setForm({ ...form, role });
  };

  // 🔐 ADMIN LOGIN
  const handleAdminLogin = (e) => {
    e.preventDefault();

    if (form.email === "admin" && form.password === "admin") {
      localStorage.setItem("token", "admin-token");
      localStorage.setItem("role", "ADMIN");

      window.location.href = "/admin/dashboard";
    } else {
      alert("Invalid Admin Credentials ❌");
    }
  };

  // 🌐 GOOGLE LOGIN
  const handleGoogleLogin = () => {
    window.location.href =
      "http://localhost:8080/oauth2/authorization/google";
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-indigo-100 overflow-hidden">

      {/* 🔵 Animated Background */}
      <motion.div
        className="absolute w-72 h-72 bg-blue-300 rounded-full blur-3xl opacity-30 top-10 left-10"
        animate={{ x: [0, 40, 0], y: [0, 30, 0] }}
        transition={{ repeat: Infinity, duration: 10 }}
      />

      <motion.div
        className="absolute w-96 h-96 bg-indigo-300 rounded-full blur-3xl opacity-30 bottom-10 right-10"
        animate={{ x: [0, -40, 0], y: [0, -30, 0] }}
        transition={{ repeat: Infinity, duration: 12 }}
      />

      {/* 🧾 LOGIN CARD */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="show"
        className="bg-white/60 backdrop-blur-xl p-10 rounded-3xl shadow-2xl border border-white/40 w-full max-w-md"
      >

        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          PandaBank Login 🐼
        </h2>

        {/* 🔥 ROLE SELECT */}
        <div className="flex bg-gray-200 rounded-xl p-1 mb-6">
          
          <button
            onClick={() => handleRoleChange("user")}
            className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-xl font-medium ${
              form.role === "user"
                ? "bg-blue-600 text-white shadow"
                : "text-gray-600"
            }`}
          >
            <FaUser />
            User
          </button>

          <button
            onClick={() => handleRoleChange("admin")}
            className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-xl font-medium ${
              form.role === "admin"
                ? "bg-red-600 text-white shadow"
                : "text-gray-600"
            }`}
          >
            <FaUserShield />
            Admin
          </button>
        </div>

        {/* ================= USER LOGIN ================= */}
        {form.role === "user" && (
          <div className="space-y-6">

            {/* Heading */}
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-700">
                Sign in with Google
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                Fast • Secure • One-click access
              </p>
            </div>

            {/* Google Button */}
            <motion.div
              whileHover={{ scale: 1.03 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 rounded-xl blur-lg opacity-20 group-hover:opacity-40 transition"></div>

              <button
                onClick={handleGoogleLogin}
                className="relative w-full flex items-center justify-center gap-3 bg-white py-3 rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition"
              >
                <img
                  src="https://www.svgrepo.com/show/475656/google-color.svg"
                  alt="google"
                  className="w-6 h-6"
                />
                <span className="font-semibold text-gray-700">
                  Continue with Google
                </span>
              </button>
            </motion.div>

            {/* Divider */}
            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-gray-300"></div>
              <span className="text-xs text-gray-400">secure login</span>
              <div className="flex-1 h-px bg-gray-300"></div>
            </div>

            {/* Trust */}
            <div className="flex justify-center gap-6 text-xs text-gray-500">
              <span>🔒 Encrypted</span>
              <span>⚡ Fast</span>
              <span>✔ Trusted</span>
            </div>

          </div>
        )}

        {/* ================= ADMIN LOGIN ================= */}
        {form.role === "admin" && (
          <form onSubmit={handleAdminLogin} className="space-y-5">

            <div className="flex items-center border rounded-xl px-4 py-3 bg-white shadow-sm">
              <FaUser className="text-gray-400 mr-3" />
              <input
                type="text"
                name="email"
                placeholder="Admin Username"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full outline-none bg-transparent"
              />
            </div>

            <div className="flex items-center border rounded-xl px-4 py-3 bg-white shadow-sm">
              <FaLock className="text-gray-400 mr-3" />
              <input
                type="password"
                name="password"
                placeholder="Admin Password"
                value={form.password}
                onChange={handleChange}
                required
                className="w-full outline-none bg-transparent"
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full bg-red-600 text-white py-3 rounded-xl font-semibold shadow-lg"
            >
              Admin Login
            </motion.button>

          </form>
        )}

        {/* Footer */}
        

      </motion.div>

    </div>
  );
}