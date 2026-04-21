import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { FaMoneyBillWave, FaUserAlt } from "react-icons/fa";

const Transfer = () => {
  const [formData, setFormData] = useState({
    receiverAccount: "",
    amount: "",
  });

  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(""); // success / error

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      await axios.post(
        "http://localhost:8080/api/transactions/transfer",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage("Transfer Successful");
      setStatus("success");

      setFormData({
        receiverAccount: "",
        amount: "",
      });

    } catch (error) {
      setMessage("Transfer Failed");
      setStatus("error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-indigo-100">

      {/* Card */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="show"
        className="bg-white/60 backdrop-blur-lg p-10 rounded-3xl shadow-2xl border border-white/40 w-full max-w-md"
      >

        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Transfer Money 💸
        </h2>

        {/* Message */}
        {message && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`text-center mb-4 font-medium ${
              status === "success"
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {status === "success" ? "✅ " : "❌ "}
            {message}
          </motion.p>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Receiver */}
          <div className="flex items-center border rounded-xl px-4 py-3 bg-white shadow-sm">
            <FaUserAlt className="text-gray-400 mr-3" />
            <input
              type="text"
              name="receiverAccount"
              placeholder="Receiver Account Number"
              value={formData.receiverAccount}
              onChange={handleChange}
              required
              className="w-full outline-none bg-transparent"
            />
          </div>

          {/* Amount */}
          <div className="flex items-center border rounded-xl px-4 py-3 bg-white shadow-sm">
            <FaMoneyBillWave className="text-gray-400 mr-3" />
            <input
              type="number"
              name="amount"
              placeholder="Enter Amount"
              value={formData.amount}
              onChange={handleChange}
              required
              className="w-full outline-none bg-transparent"
            />
          </div>

          {/* Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold shadow-lg"
          >
            Send Money
          </motion.button>

        </form>

      </motion.div>

    </div>
  );
};

export default Transfer;