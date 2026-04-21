import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role"); // ✅ user / admin

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const linkClass =
    "px-3 py-2 rounded-lg text-sm font-medium transition duration-200";

  const activeClass = "bg-blue-600 text-white shadow";
  const inactiveClass =
    "text-gray-700 hover:bg-blue-100 hover:text-blue-600";

  const closeMenu = () => setOpen(false);

  return (
    <>
      {/* Navbar */}
      <nav className="fixed w-full z-50 bg-white/70 backdrop-blur-lg shadow-md">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">

            {/* Logo */}
            <h1
              onClick={() => navigate("/")}
              className="text-blue-600 text-xl font-bold cursor-pointer"
            >
              PandaBank 🐼
            </h1>

            {/* Desktop Links */}
            <div className="hidden md:flex space-x-3">

              <NavLink to="/" className={({ isActive }) =>
                `${linkClass} ${isActive ? activeClass : inactiveClass}`}>
                Home
              </NavLink>

              <NavLink to="/about" className={({ isActive }) =>
                `${linkClass} ${isActive ? activeClass : inactiveClass}`}>
                About
              </NavLink>

              <NavLink to="/services" className={({ isActive }) =>
                `${linkClass} ${isActive ? activeClass : inactiveClass}`}>
                Services
              </NavLink>

              {/* USER LINKS */}
              {token && role === "USER" && (
                <>
                  <NavLink to="/dashboard" className={({ isActive }) =>
                    `${linkClass} ${isActive ? activeClass : inactiveClass}`}>
                    Dashboard
                  </NavLink>

                  <NavLink to="/transfer" className={({ isActive }) =>
                    `${linkClass} ${isActive ? activeClass : inactiveClass}`}>
                    Transfer
                  </NavLink>

                  <NavLink to="/transactions" className={({ isActive }) =>
                    `${linkClass} ${isActive ? activeClass : inactiveClass}`}>
                    Transactions
                  </NavLink>

                  <NavLink to="/profile" className={({ isActive }) =>
                    `${linkClass} ${isActive ? activeClass : inactiveClass}`}>
                    Profile
                  </NavLink>
                </>
              )}

              {/* ADMIN LINKS */}
              {token && role === "ADMIN" && (
                <>
                  <NavLink to="/admin/dashboard" className={({ isActive }) =>
                    `${linkClass} ${isActive ? activeClass : inactiveClass}`}>
                    Admin Dashboard
                  </NavLink>

                  <NavLink to="/admin/users" className={({ isActive }) =>
                    `${linkClass} ${isActive ? activeClass : inactiveClass}`}>
                    Users
                  </NavLink>

                  <NavLink to="/admin/transactions" className={({ isActive }) =>
                    `${linkClass} ${isActive ? activeClass : inactiveClass}`}>
                    Transactions
                  </NavLink>
                </>
              )}
            </div>

            {/* Right Buttons */}
            <div className="hidden md:flex gap-3">
              {!token ? (
                <>
                  <button
                    onClick={() => navigate("/login")}
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm shadow"
                  >
                    Login
                  </button>

                  {/* <button
                    onClick={() => navigate("/register")}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm shadow"
                  >
                    Register
                  </button> */}
                </>
              ) : (
                <button
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm shadow"
                >
                  Logout
                </button>
              )}
            </div>

            {/* Mobile Icon */}
            <div
              className="md:hidden text-2xl cursor-pointer"
              onClick={() => setOpen(!open)}
            >
              {open ? <FaTimes /> : <FaBars />}
            </div>

          </div>
        </div>

        {/* Mobile Menu */}
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden bg-white shadow-lg flex flex-col items-center space-y-4 py-6"
          >
            <NavLink to="/" onClick={closeMenu}>Home</NavLink>
            <NavLink to="/about" onClick={closeMenu}>About</NavLink>
            <NavLink to="/services" onClick={closeMenu}>Services</NavLink>

            {token && role === "USER" && (
              <>
                <NavLink to="/dashboard" onClick={closeMenu}>Dashboard</NavLink>
                <NavLink to="/transfer" onClick={closeMenu}>Transfer</NavLink>
                <NavLink to="/transactions" onClick={closeMenu}>Transactions</NavLink>
                <NavLink to="/profile" onClick={closeMenu}>Profile</NavLink>
              </>
            )}

            {token && role === "ADMIN" && (
              <>
                <NavLink to="/admin/dashboard" onClick={closeMenu}>Admin Dashboard</NavLink>
                <NavLink to="/admin/users" onClick={closeMenu}>Users</NavLink>
                <NavLink to="/admin/transactions" onClick={closeMenu}>Transactions</NavLink>
              </>
            )}

            {!token ? (
              <>
                <button
                  onClick={() => { navigate("/login"); closeMenu(); }}
                  className="bg-green-500 text-white px-6 py-2 rounded-lg"
                >
                  Login
                </button>

                <button
                  onClick={() => { navigate("/register"); closeMenu(); }}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg"
                >
                  Register
                </button>
              </>
            ) : (
              <button
                onClick={() => { handleLogout(); closeMenu(); }}
                className="bg-red-500 text-white px-6 py-2 rounded-lg"
              >
                Logout
              </button>
            )}
          </motion.div>
        )}
      </nav>

      {/* 👇 IMPORTANT: Prevent content hiding under fixed navbar */}
     
    </>
  );
};

export default Navbar;