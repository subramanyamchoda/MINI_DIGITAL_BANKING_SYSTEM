import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaUsers,
  FaExchangeAlt,
  FaWallet,
  FaUserShield,
} from "react-icons/fa";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalTransactions: 0,
    totalBalance: 0,
  });

  const navigate = useNavigate();

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          "http://localhost:8080/api/admin/dashboard",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setStats(res.data);
      } catch (error) {
        console.error("Error fetching admin stats");
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="min-h-screen  bg-gradient-to-br from-indigo-100 via-white to-blue-100 p-6">
    <div className="mx-auto max-w-7xl">
      {/* 🔷 Header */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="show"
        className="flex items-center justify-between mt-15 mb-5 "
      >
        <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
          <FaUserShield className="text-indigo-600" />
          Admin Dashboard
        </h2>
      </motion.div>

      {/* 📊 Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 mx-auto max-w-7xl">

        {/* Users */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          whileHover={{ scale: 1.05 }}
          className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-6 rounded-3xl shadow-xl flex justify-between items-center"
        >
          <div>
            <p>Total Users</p>
            <h3 className="text-3xl font-bold mt-2">
              {stats.totalUsers}
            </h3>
          </div>
          <FaUsers className="text-4xl opacity-80" />
        </motion.div>

        {/* Transactions */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          whileHover={{ scale: 1.05 }}
          className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-6 rounded-3xl shadow-xl flex justify-between items-center"
        >
          <div>
            <p>Total Transactions</p>
            <h3 className="text-3xl font-bold mt-2">
              {stats.totalTransactions}
            </h3>
          </div>
          <FaExchangeAlt className="text-4xl opacity-80" />
        </motion.div>

        {/* Balance */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          whileHover={{ scale: 1.05 }}
          className="bg-gradient-to-r from-purple-500 to-pink-600 text-white p-6 rounded-3xl shadow-xl flex justify-between items-center"
        >
          <div>
            <p>Total Balance</p>
            <h3 className="text-3xl font-bold mt-2">
              ₹ {stats.totalBalance}
            </h3>
          </div>
          <FaWallet className="text-4xl opacity-80" />
        </motion.div>

      </div>



 
      {/* ⚡ Quick Actions */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >

        <motion.div
          whileHover={{ scale: 1.05 }}
          onClick={() => navigate("/admin/users")}
          className="bg-white p-6 rounded-2xl shadow-lg cursor-pointer text-center"
        >
          <FaUsers className="text-3xl text-blue-600 mx-auto mb-3" />
          <p className="font-semibold text-gray-800">
            Manage Users
          </p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          onClick={() => navigate("/admin/transactions")}
          className="bg-white p-6 rounded-2xl shadow-lg cursor-pointer text-center"
        >
          <FaExchangeAlt className="text-3xl text-red-500 mx-auto mb-3" />
          <p className="font-semibold text-gray-800">
            View Transactions
          </p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          onClick={() => navigate("/dashboard")}
          className="bg-white p-6 rounded-2xl shadow-lg cursor-pointer text-center"
        >
          <FaUserShield className="text-3xl text-gray-700 mx-auto mb-3" />
          <p className="font-semibold text-gray-800">
            User Dashboard
          </p>
        </motion.div>

      </motion.div>
 </div>
 </div>
    
  );
};

export default AdminDashboard;