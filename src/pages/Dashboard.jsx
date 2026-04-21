import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaWallet, FaExchangeAlt, FaUser, FaHistory } from "react-icons/fa";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const navigate = useNavigate();

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");

        const userRes = await axios.get(
          "http://localhost:8080/api/user/profile",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const txRes = await axios.get(
          "http://localhost:8080/api/transactions",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setUser(userRes.data);
        setTransactions(txRes.data.slice(0, 5));
      } catch (error) {
        console.error("Error loading dashboard");
      }
    };

    fetchData();
  }, []);

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-600">
        Loading Dashboard...
      </div>
    );
  }

  return (
    <div className="min-h-screen  bg-gradient-to-br from-blue-100 via-white to-indigo-100 p-10">

      {/* 🔵 Header */}
      <motion.h2
        variants={fadeUp}
        initial="hidden"
        animate="show"
        className="text-3xl font-bold mb-6 text-gray-800"
      >
        Welcome back, {user.name} 👋
      </motion.h2>

      {/* 💰 Balance Card */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="show"
        className="bg-gradient-to-r  from-blue-600 to-indigo-600 text-white p-8 rounded-3xl shadow-xl mb-8 flex justify-between items-center"
      >
        <div>
          <h3 className="text-lg">Available Balance</h3>
          <p className="text-4xl font-bold mt-2">₹ {user.balance}</p>
        </div>
        <FaWallet className="text-5xl opacity-80" />
      </motion.div>

      {/* ⚡ Quick Actions */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="show"
        className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8"
      >
        <motion.div
          whileHover={{ scale: 1.05 }}
          onClick={() => navigate("/transfer")}
          className="bg-white p-6 rounded-2xl shadow-lg text-center cursor-pointer"
        >
          <FaExchangeAlt className="text-3xl text-green-600 mx-auto mb-3" />
          <p className="font-semibold">Transfer</p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          onClick={() => navigate("/transactions")}
          className="bg-white p-6 rounded-2xl shadow-lg text-center cursor-pointer"
        >
          <FaHistory className="text-3xl text-indigo-600 mx-auto mb-3" />
          <p className="font-semibold">Transactions</p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          onClick={() => navigate("/profile")}
          className="bg-white p-6 rounded-2xl shadow-lg text-center cursor-pointer"
        >
          <FaUser className="text-3xl text-gray-700 mx-auto mb-3" />
          <p className="font-semibold">Profile</p>
        </motion.div>

      </motion.div>

      {/* 📊 Recent Transactions */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="show"
        className="bg-white/70 backdrop-blur-lg rounded-3xl shadow-xl p-6"
      >
        <h3 className="text-xl font-semibold mb-4 text-gray-800">
          Recent Transactions
        </h3>

        {transactions.length === 0 ? (
          <p className="text-gray-500">No transactions yet</p>
        ) : (
          <div className="space-y-4">
            {transactions.map((tx) => (
              <div
                key={tx.id}
                className="flex justify-between items-center p-4 bg-white rounded-xl shadow-sm border"
              >
                <div>
                  <p className="font-semibold">
                    {tx.type === "CREDIT" ? "Received" : "Sent"}
                  </p>
                  <p className="text-sm text-gray-500">
                    {new Date(tx.date).toLocaleString()}
                  </p>
                </div>

                <p
                  className={`font-bold ${
                    tx.type === "CREDIT"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  ₹ {tx.amount}
                </p>
              </div>
            ))}
          </div>
        )}
      </motion.div>

    </div>
  );
};

export default Dashboard;