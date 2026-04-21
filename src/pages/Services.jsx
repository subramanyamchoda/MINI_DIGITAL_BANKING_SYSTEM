import React from "react";
import { motion } from "framer-motion";
import { FaWallet, FaExchangeAlt, FaShieldAlt, FaChartLine, FaMobileAlt, FaCloud } from "react-icons/fa";

export default function Services() {

  const fadeUp = {
    hidden: { opacity: 0, y: 60 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  const services = [
    {
      icon: <FaWallet />,
      title: "Account Management",
      desc: "Create and manage accounts with real-time balance tracking and insights.",
      color: "text-blue-600",
    },
    {
      icon: <FaExchangeAlt />,
      title: "Money Transfers",
      desc: "Send and receive money instantly with secure transaction processing.",
      color: "text-green-600",
    },
    {
      icon: <FaShieldAlt />,
      title: "Secure Banking",
      desc: "Advanced encryption and authentication for complete data protection.",
      color: "text-red-600",
    },
    {
      icon: <FaChartLine />,
      title: "Analytics & Reports",
      desc: "Track spending, analyze transactions, and view detailed reports.",
      color: "text-purple-600",
    },
    {
      icon: <FaMobileAlt />,
      title: "Mobile Banking",
      desc: "Access your account anytime, anywhere with a responsive interface.",
      color: "text-indigo-600",
    },
    {
      icon: <FaCloud />,
      title: "Cloud Integration",
      desc: "Fast and scalable cloud-based banking services.",
      color: "text-cyan-600",
    },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-indigo-100 via-white to-blue-100">

      {/* 🔵 Animated Background */}
      <motion.div
        className="absolute w-80 h-80 bg-indigo-300 rounded-full blur-3xl opacity-30 top-10 left-10"
        animate={{ x: [0, 40, 0], y: [0, 30, 0] }}
        transition={{ repeat: Infinity, duration: 10 }}
      />
      <motion.div
        className="absolute w-96 h-96 bg-blue-300 rounded-full blur-3xl opacity-30 bottom-10 right-10"
        animate={{ x: [0, -40, 0], y: [0, -30, 0] }}
        transition={{ repeat: Infinity, duration: 12 }}
      />

      {/* HEADER */}
      <section className="mx-auto max-w-7xl">
      <section className="text-center pt-24 pb-12 px-6">
        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="text-5xl md:text-6xl font-bold text-gray-800"
        >
          Our Services
        </motion.h1>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="show"
          transition={{ delay: 0.3 }}
          className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto"
        >
          Explore powerful banking services designed for speed, security, and seamless user experience.
        </motion.p>
      </section>

      {/* SERVICES GRID */}
      <section className="grid md:grid-cols-3 gap-10 px-8 pb-24">

        {services.map((service, index) => (
          <motion.div
            key={index}
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            whileHover={{ scale: 1.07 }}
            className="bg-white/60 backdrop-blur-lg p-8 rounded-3xl shadow-2xl border border-white/40 text-center"
          >
            {/* Icon Animation */}
            <motion.div
              className={`text-5xl ${service.color} mb-6`}
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              {service.icon}
            </motion.div>

            <h3 className="text-xl font-bold text-gray-800">
              {service.title}
            </h3>

            <p className="text-gray-600 mt-4">
              {service.desc}
            </p>
          </motion.div>
        ))}

      </section>
    </section>
     
    </div>
  );
}