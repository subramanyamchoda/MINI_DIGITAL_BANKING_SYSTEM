import React from "react";
import { motion } from "framer-motion";
import { FaUsers, FaLock, FaChartLine } from "react-icons/fa";

export default function AboutPage() {

  const fadeUp = {
    hidden: { opacity: 0, y: 60 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8 } }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-indigo-100 via-white to-blue-100">
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
      <section className="mx-auto max-w-7xl">
      
      <section className="  text-center px-6 py-24  ">
        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="text-5xl font-extrabold text-gray-800"
        >
          About Panda Banking
        </motion.h1>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="show"
          transition={{ delay: 0.3 }}
          className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto"
        >
          Panda Banking is a modern digital banking platform designed to simplify financial management with speed, security, and innovation.
        </motion.p>
      </section>

      {/* MISSION / VISION */}
      <section className="grid md:grid-cols-2 gap-10 px-8 pb-20">

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          className="bg-white/60 backdrop-blur-xl p-8 rounded-3xl shadow-xl"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Our Mission
          </h2>
          <p className="text-gray-600">
            To provide secure, fast, and user-friendly digital banking solutions that empower users to manage their finances efficiently.
          </p>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          className="bg-white/60 backdrop-blur-xl p-8 rounded-3xl shadow-xl"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Our Vision
          </h2>
          <p className="text-gray-600">
            To become a leading fintech platform delivering intelligent and seamless banking experiences worldwide.
          </p>
        </motion.div>

      </section>

      {/* FEATURES / VALUES */}
      <section className="grid md:grid-cols-3 gap-10 px-8 pb-24">

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          whileHover={{ scale: 1.07 }}
          className="bg-white/60 backdrop-blur-xl p-8 rounded-3xl shadow-xl text-center"
        >
          <motion.div
            className="w-14 h-14 mx-auto flex items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl mb-4"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ repeat: Infinity, duration: 4 }}
          >
            <FaUsers />
          </motion.div>

          <h3 className="text-xl font-bold">User Focused</h3>
          <p className="text-gray-600 mt-3">
            Designed with user experience and simplicity in mind.
          </p>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          whileHover={{ scale: 1.07 }}
          className="bg-white/60 backdrop-blur-xl p-8 rounded-3xl shadow-xl text-center"
        >
          <motion.div
            className="w-14 h-14 mx-auto flex items-center justify-center bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl mb-4"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <FaChartLine />
          </motion.div>

          <h3 className="text-xl font-bold">High Performance</h3>
          <p className="text-gray-600 mt-3">
            Fast and reliable system for smooth transactions.
          </p>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          whileHover={{ scale: 1.07 }}
          className="bg-white/60 backdrop-blur-xl p-8 rounded-3xl shadow-xl text-center"
        >
          <motion.div
            className="w-14 h-14 mx-auto flex items-center justify-center bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-xl mb-4"
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <FaLock />
          </motion.div>

          <h3 className="text-xl font-bold">Secure Platform</h3>
          <p className="text-gray-600 mt-3">
            Advanced security ensures protection of your data.
          </p>
        </motion.div>

      </section>

     </section>

    </div>
  );
}