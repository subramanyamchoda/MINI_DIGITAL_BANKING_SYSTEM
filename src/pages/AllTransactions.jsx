import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { FaSearch } from "react-icons/fa";

const AllTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [search, setSearch] = useState("");

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  useEffect(() => {
    const fetchAllTransactions = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          "http://localhost:8080/api/admin/transactions",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setTransactions(res.data);
      } catch (error) {
        console.error("Error fetching all transactions");
      }
    };

    fetchAllTransactions();
  }, []);

  // 🔍 Filter transactions
  const filtered = transactions.filter(
    (tx) =>
      tx.fromAccount?.includes(search) ||
      tx.toAccount?.includes(search)
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-indigo-100 p-6">
    <div className="mx-auto max-w-7xl">
      {/* Header */}
      <motion.h2
        variants={fadeUp}
        initial="hidden"
        animate="show"
        className="text-3xl font-bold mb-8 mt-15 text-gray-800"
      >
        Admin - All Transactions 📊
      </motion.h2>

      {/* Search */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="show"
        className="flex items-center bg-white rounded-xl shadow-md px-4 py-3 mb-6 w-full md:w-1/3"
      >
        <FaSearch className="text-gray-400 mr-3" />
        <input
          type="text"
          placeholder="Search by account..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full outline-none"
        />
      </motion.div>

      {/* Transactions List */}
      <div className="space-y-4">
        {filtered.length === 0 ? (
          <p className="text-gray-500">No transactions found</p>
        ) : (
          filtered.map((tx) => (
            <motion.div
              key={tx.id}
              variants={fadeUp}
              initial="hidden"
              animate="show"
              whileHover={{ scale: 1.02 }}
              className="bg-white/70 backdrop-blur-lg p-5 rounded-2xl shadow-lg border flex flex-col md:flex-row justify-between items-start md:items-center"
            >
              {/* Left Info */}
              <div>
                <p className="font-semibold text-gray-800">
                  Transaction ID: {tx.id}
                </p>
                <p className="text-sm text-gray-500">
                  {new Date(tx.date).toLocaleString()}
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  From: {tx.fromAccount} → To: {tx.toAccount}
                </p>
              </div>

              {/* Right Info */}
              <div className="mt-3 md:mt-0 text-right">
                <p
                  className={`text-lg font-bold ${
                    tx.type === "CREDIT"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {tx.type === "CREDIT" ? "+ " : "- "}₹ {tx.amount}
                </p>
                <p className="text-sm text-gray-500">{tx.type}</p>
              </div>
            </motion.div>
          ))
        )}
      </div>
  </div>
    </div>
  );
};

export default AllTransactions;