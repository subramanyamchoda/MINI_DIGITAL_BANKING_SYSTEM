import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          "http://localhost:8080/api/transactions",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setTransactions(res.data);
      } catch (error) {
        console.error("Error fetching transactions");
      }
    };

    fetchTransactions();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-indigo-100 p-6">

      {/* Title */}
      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-3xl font-bold text-gray-800 mb-6 text-center"
      >
        Transaction History
      </motion.h2>

      {/* Card */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="show"
        className="bg-white/60 backdrop-blur-lg p-6 rounded-3xl shadow-2xl border border-white/40"
      >

        {transactions.length === 0 ? (
          <p className="text-center text-gray-500">
            No transactions found.
          </p>
        ) : (
          <div className="overflow-x-auto">

            <table className="min-w-full">

              <thead>
                <tr className="text-gray-600 border-b">
                  <th className="py-3 px-4 text-left">Date</th>
                  <th className="py-3 px-4 text-left">Type</th>
                  <th className="py-3 px-4 text-left">Amount</th>
                  <th className="py-3 px-4 text-left">From</th>
                  <th className="py-3 px-4 text-left">To</th>
                </tr>
              </thead>

              <tbody>
                {transactions.map((tx) => (
                  <motion.tr
                    key={tx.id}
                    whileHover={{ scale: 1.01 }}
                    className="border-b hover:bg-white/40 transition"
                  >
                    <td className="py-4 px-4 text-gray-600">
                      {new Date(tx.date).toLocaleString()}
                    </td>

                    {/* Type */}
                    <td className="py-4 px-4">
                      <span
                        className={`flex items-center gap-2 font-semibold ${
                          tx.type === "CREDIT"
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {tx.type === "CREDIT" ? (
                          <FaArrowDown />
                        ) : (
                          <FaArrowUp />
                        )}
                        {tx.type}
                      </span>
                    </td>

                    {/* Amount */}
                    <td
                      className={`py-4 px-4 font-bold ${
                        tx.type === "CREDIT"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      ₹ {tx.amount}
                    </td>

                    <td className="py-4 px-4 text-gray-600">
                      {tx.fromAccount}
                    </td>

                    <td className="py-4 px-4 text-gray-600">
                      {tx.toAccount}
                    </td>
                  </motion.tr>
                ))}
              </tbody>

            </table>

          </div>
        )}
      </motion.div>

    </div>
  );
};

export default Transactions;