import React from "react";
import { ArrowRight, Store, Bot, DollarSign } from "lucide-react";
import Link from "next/link";

const SelectPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Enhance Your Business
          </h1>
          <p className="text-xl text-gray-600">
            Choose the perfect solution to power your business growth
          </p>
        </div>

        {/* Cards Container */}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
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
                  Discover ready-to-use plugins that can instantly enhance your
                  business operations. Browse through our curated collection of
                  tools and solutions.
                </p>

                <div className="flex items-center text-blue-500 group-hover:text-white transition-colors duration-300">
                  Explore Marketplace
                  <ArrowRight className="ml-2 h-4 w-4" />
                </div>
              </div>
            </div>
          </Link>
          {/* Custom AI Agents Card */}
          <Link href="/subcription">
            <div className="group relative bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />

              <div className="relative z-10">
                <div className="mb-4">
                  <Bot className="h-12 w-12 text-purple-500 group-hover:text-white transition-colors duration-300" />
                </div>

                <h2 className="text-2xl font-semibold text-gray-900 group-hover:text-white mb-4 transition-colors duration-300">
                  Custom AI Agents
                </h2>

                <p className="text-gray-600 group-hover:text-white mb-6 transition-colors duration-300">
                  Get tailored AI solutions designed specifically for your
                  business needs. Our experts will create custom agents to
                  automate and optimize your workflows.
                </p>

                <div className="flex items-center text-purple-500 group-hover:text-white transition-colors duration-300">
                  Build Custom Agents
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
        </div>
      </div>
    </div>
  );
};

export default SelectPage;
