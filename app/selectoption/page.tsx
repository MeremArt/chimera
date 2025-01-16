"use client";

import React, { useState, useEffect } from "react";
import {
  ArrowRight,
  Store,
  Bot,
  DollarSign,
  Sparkles,
  Cpu,
} from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const Loader = () => {
  return (
    <motion.div
      className="fixed inset-0 bg-gradient-to-br from-indigo-50 to-blue-100 flex items-center justify-center z-50"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative">
        <motion.div
          className="w-16 h-16 border-4 border-blue-500 rounded-full"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
            borderRadius: ["50%", "30%", "50%"],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-0 left-0 w-16 h-16 border-4 border-purple-500 rounded-full"
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [180, 360, 540],
            borderRadius: ["30%", "50%", "30%"],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>
    </motion.div>
  );
};

const SelectPage = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence>{loading && <Loader />}</AnimatePresence>

      <motion.div
        className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 p-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 2 }}
      >
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <motion.h1
              className="text-4xl font-bold text-gray-900 mb-4"
              initial={{ y: -20 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.5, delay: 2.2 }}
            >
              Enhance Your Business
            </motion.h1>
            <motion.p
              className="text-xl text-gray-600"
              initial={{ y: -20 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.5, delay: 2.4 }}
            >
              Choose the perfect solution to power your business growth
            </motion.p>
          </div>

          {/* Cards Container */}
          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-6xl mx-auto"
            initial={{ y: 20 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5, delay: 2.6 }}
          >
            {/* Plugins Marketplace Card */}
            <Link href="/plugin_market">
              <div className="group relative bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 cursor-pointer">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />

                <div className="relative z-10">
                  <div className="mb-4">
                    <Store className="h-12 w-12 text-blue-500 group-hover:text-white transition-colors duration-300" />
                  </div>

                  <h2 className="text-2xl font-semibold text-gray-900 group-hover:text-white mb-4 transition-colors duration-300">
                    Plugins Marketplace
                  </h2>

                  <p className="text-gray-600 group-hover:text-white mb-6 transition-colors duration-300">
                    Discover ready-to-use plugins that can instantly enhance
                    your business operations. Browse through our curated
                    collection of tools and solutions.
                  </p>

                  <div className="flex items-center text-blue-500 group-hover:text-white transition-colors duration-300">
                    Explore Marketplace
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </div>
                </div>
              </div>
            </Link>

            {/* AI Character Hub Card */}
            <Link href="/CharacterMarketplace">
              <div className="group relative bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 cursor-pointer">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />

                <div className="relative z-10">
                  <div className="mb-4">
                    <Bot className="h-12 w-12 text-purple-500 group-hover:text-white transition-colors duration-300" />
                  </div>

                  <h2 className="text-2xl font-semibold text-gray-900 group-hover:text-white mb-4 transition-colors duration-300">
                    AI Character Hub
                  </h2>

                  <p className="text-gray-600 group-hover:text-white mb-6 transition-colors duration-300">
                    Discover and integrate AI agent characters tailored to
                    enhance your personal AI projects. From virtual assistants
                    to interactive bots.
                  </p>

                  <div className="flex items-center text-purple-500 group-hover:text-white transition-colors duration-300">
                    Explore Marketplace
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </div>
                </div>
              </div>
            </Link>

            {/* Custom AI Agent Builder Card */}
            <Link href="/bookacall">
              <div className="group relative bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 cursor-pointer">
                <div className="absolute inset-0 bg-gradient-to-r from-pink-400 to-rose-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />

                <div className="relative z-10">
                  <div className="mb-4">
                    <Cpu className="h-12 w-12 text-pink-500 group-hover:text-white transition-colors duration-300" />
                  </div>

                  <h2 className="text-2xl font-semibold text-gray-900 group-hover:text-white mb-4 transition-colors duration-300">
                    Custom AI Agent
                  </h2>

                  <p className="text-gray-600 group-hover:text-white mb-6 transition-colors duration-300">
                    Create your own unique AI agents from scratch. Define
                    personality, knowledge base, and behavior patterns. Perfect
                    for businesses needing specialized AI solutions.
                  </p>

                  <div className="flex items-center text-pink-500 group-hover:text-white transition-colors duration-300">
                    Start Building
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </div>
                </div>
              </div>
            </Link>

            {/* AI Monetization Hub Card */}
            <Link href="/monetization">
              <div className="group relative bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 cursor-pointer">
                <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-green-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />

                <div className="relative z-10">
                  <div className="mb-4">
                    <DollarSign className="h-12 w-12 text-green-500 group-hover:text-white transition-colors duration-300" />
                  </div>

                  <h2 className="text-2xl font-semibold text-gray-900 group-hover:text-white mb-4 transition-colors duration-300">
                    AI Monetization Hub
                  </h2>

                  <p className="text-gray-600 group-hover:text-white mb-6 transition-colors duration-300">
                    Turn your AI innovations into revenue streams. Share or sell
                    your custom agents and plugins in our community marketplace,
                    creating passive income opportunities.
                  </p>

                  <div className="flex items-center text-green-500 group-hover:text-white transition-colors duration-300">
                    Start Earning
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </>
  );
};

export default SelectPage;
