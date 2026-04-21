import React from "react";
import { motion } from "framer-motion";
import { FaWallet, FaExchangeAlt, FaShieldAlt, FaCheckCircle } from "react-icons/fa";

export default function HomePage() {

  const container = {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.2 }
    }
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 50 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7 } }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-indigo-100 via-white to-blue-100 font-sans">

      {/* 🔵 Background Glow */}
      <motion.div
        className="absolute w-80 h-80 bg-blue-400 rounded-full blur-3xl opacity-30 top-10 left-10"
        animate={{ x: [0, 60, 0], y: [0, 40, 0] }}
        transition={{ repeat: Infinity, duration: 12 }}
      />
      <motion.div
        className="absolute w-96 h-96 bg-indigo-400 rounded-full blur-3xl opacity-30 bottom-10 right-10"
        animate={{ x: [0, -60, 0], y: [0, -40, 0] }}
        transition={{ repeat: Infinity, duration: 14 }}
      />

      {/* HERO */}
      <section className="relative flex flex-col md:flex-row items-center justify-between px-6 py-24 md:py-32 max-w-7xl mx-auto gap-16">

        {/* LEFT SIDE */}
        <div className="text-center md:text-left max-w-xl z-10">

          {/* Heading */}
         <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="text-3xl sm:text-3xl md:text-6xl lg:text-6xl font-extrabold text-gray-900 leading-tight tracking-tight"
          >
            🐼 Panda <br />
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
             MINI DIGITAL BANKING SYSTEM
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            transition={{ delay: 0.2 }}
            className="mt-6 text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed"
          >
            Fast, secure, and modern banking experience built for the next generation.
          </motion.p>

          {/* Feature Points */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="mt-8 space-y-3"
          >
            {[
              "Real-time transaction tracking",
              "Secure payments with encryption",
              "Instant money transfers",
              "24/7 smart support system"
            ].map((item, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="flex items-center gap-3 justify-center md:justify-start text-sm sm:text-base md:text-lg"
              >
                <FaCheckCircle className="text-green-500 text-base md:text-lg" />
                <span className="text-gray-700">{item}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* Button */}
          <motion.a
            href="/register"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block mt-10 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 md:px-10 md:py-4 rounded-2xl shadow-xl text-base md:text-lg font-semibold"
          >
            Get Started
          </motion.a>

        </div>

        {/* RIGHT SIDE */}
        <motion.div
          className="relative flex justify-center items-center"
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >

          {/* Glow */}
          <div className="absolute w-[450px] h-[450px] bg-blue-300 blur-3xl opacity-30 rounded-full"></div>

          {/* Image */}
          <motion.img
            src="/home.png"
            alt="Hero"
            className="relative w-[300px] sm:w-[380px] md:w-[500px] lg:w-[600px] rounded-3xl shadow-2xl"
            animate={{ y: [0, -15, 0] }}
            transition={{ repeat: Infinity, duration: 4 }}
          />

        </motion.div>

      </section>

      {/* FEATURES */}
      <motion.section
        variants={container}
        initial="hidden"
        animate="show"
        className="relative grid md:grid-cols-3 gap-10 px-8 pb-24 max-w-6xl mx-auto"
      >

        {[{
          icon: <FaWallet size={22} />,
          title: "Smart Accounts",
          desc: "Manage balances and transactions with real-time insights.",
          color: "from-blue-500 to-indigo-500"
        },
        {
          icon: <FaExchangeAlt size={22} />,
          title: "Instant Transfers",
          desc: "Send money instantly with fast and secure transactions.",
          color: "from-green-500 to-emerald-500"
        },
        {
          icon: <FaShieldAlt size={22} />,
          title: "Secure Banking",
          desc: "Advanced security ensures your data is always protected.",
          color: "from-red-500 to-pink-500"
        }].map((card, i) => (

          <motion.div
            key={i}
            variants={fadeUp}
            whileHover={{ scale: 1.07 }}
            className="group bg-white/60 backdrop-blur-xl p-8 rounded-3xl shadow-xl border border-white/30"
          >
            <motion.div
              className={`w-14 h-14 flex items-center justify-center rounded-xl bg-gradient-to-r ${card.color} text-white mb-5`}
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 3 }}
            >
              {card.icon}
            </motion.div>

            <h3 className="text-xl font-bold text-gray-800">
              {card.title}
            </h3>
            <p className="text-gray-600 mt-3">
              {card.desc}
            </p>
          </motion.div>

        ))}

      </motion.section>

    </div>
  );
}
