import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { FaUserCircle, FaEnvelope, FaWallet, FaIdCard } from "react-icons/fa";

const Profile = () => {
  const [user, setUser] = useState(null);

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          "http://localhost:8080/api/user/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setUser(res.data);
      } catch (error) {
        console.error("Error fetching profile");
      }
    };

    fetchProfile();
  }, []);

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-blue-100 to-indigo-100">
        <motion.p
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="text-gray-600 text-lg"
        >
          Loading Profile...
        </motion.p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-blue-100 via-white to-indigo-100 p-4">

      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="show"
        className="bg-white/60 backdrop-blur-lg p-8 rounded-3xl shadow-2xl w-full max-w-md border border-white/40"
      >

        {/* Avatar */}
        <div className="flex flex-col items-center">
          <FaUserCircle className="text-7xl text-blue-600 mb-3" />
          <h2 className="text-2xl font-bold text-gray-800">
            {user.name}
          </h2>
          <p className="text-gray-500">{user.email}</p>
        </div>

        {/* Divider */}
        <div className="my-6 border-t"></div>

        {/* Details */}
        <div className="space-y-5 text-gray-700">

          <div className="flex items-center gap-3">
            <FaEnvelope className="text-blue-500" />
            <span className="font-medium">Email:</span>
            <span>{user.email}</span>
          </div>

          <div className="flex items-center gap-3">
            <FaIdCard className="text-purple-500" />
            <span className="font-medium">Account No:</span>
            <span>{user.accountNumber}</span>
          </div>

        </div>

        {/* Balance Card */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="mt-8 bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 rounded-2xl shadow-lg"
        >
          <div className="flex items-center gap-3">
            <FaWallet className="text-2xl" />
            <span className="text-lg font-semibold">Balance</span>
          </div>

          <h3 className="text-3xl font-bold mt-3">
            ₹ {user.balance}
          </h3>
        </motion.div>

      </motion.div>
    </div>
  );
};

export default Profile;