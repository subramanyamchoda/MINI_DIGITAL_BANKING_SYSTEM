import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { FaSearch, FaUserCircle } from "react-icons/fa";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          "http://localhost:8080/api/admin/users",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setUsers(res.data);
      } catch (error) {
        console.error("Error fetching users");
      }
    };

    fetchUsers();
  }, []);

  // 🔍 Filter users
  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-indigo-100 p-6 ">

      {/* Title */}
      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-3xl font-bold text-gray-800 mt-15 mb-5 text-center "
      >
        Admin - All Users
      </motion.h2>

      {/* Search Bar */}
      <div className="max-w-7xl mx-auto ">
      <div className="flex items-center bg-white shadow-md rounded-xl px-4 py-3 mb-6 ">
        <FaSearch className="text-gray-400 mr-3" />
        <input
          type="text"
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full outline-none"
        />
      </div>

      {/* Table Card */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="show"
        className="bg-white/60 backdrop-blur-lg p-6 rounded-3xl shadow-2xl border border-white/40"
      >

        <div className="overflow-x-auto">
          <table className="min-w-full">

            <thead>
              <tr className="border-b text-gray-600">
                <th className="py-3 px-4 text-left">User</th>
                <th className="py-3 px-4 text-left">Email</th>
                <th className="py-3 px-4 text-left">Account No</th>
                <th className="py-3 px-4 text-left">Balance</th>
              </tr>
            </thead>

            <tbody>
              {filteredUsers.map((user) => (
                <motion.tr
                  key={user.id}
                  whileHover={{ scale: 1.01 }}
                  className="border-b hover:bg-white/40 transition"
                >
                  {/* User */}
                  <td className="py-4 px-4 flex items-center gap-3">
                    <FaUserCircle className="text-2xl text-blue-500" />
                    <span className="font-medium">{user.name}</span>
                  </td>

                  <td className="py-4 px-4 text-gray-600">
                    {user.email}
                  </td>

                  <td className="py-4 px-4 text-gray-600">
                    {user.accountNumber}
                  </td>

                  {/* Balance */}
                  <td className="py-4 px-4 font-semibold text-green-600">
                    ₹ {user.balance}
                  </td>

                </motion.tr>
              ))}
            </tbody>

          </table>
        </div>

        {filteredUsers.length === 0 && (
          <p className="text-center text-gray-500 mt-4">
            No users found.
          </p>
        )}

      </motion.div>
</div>
    </div>
  );
};

export default Users;