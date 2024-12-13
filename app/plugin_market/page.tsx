"use client";
import React, { useState } from "react";
import { Download, Search, Star, Newspaper } from "lucide-react";

interface BasePlugin {
  id: number;
  name: string;
  description: string;
  price: number;
  rating: number;
  downloads: number;
  tags: string[];
}

interface FeaturedPlugin extends BasePlugin {
  featured: true;
  features: string[];
  downloadUrl: string;
}

interface RegularPlugin extends BasePlugin {
  featured?: false;
  features?: never;
  downloadUrl?: never;
}

type Plugin = FeaturedPlugin | RegularPlugin;

const PluginMarketplace = () => {
  const [filter, setFilter] = useState("all");

  const featuredPlugin: FeaturedPlugin = {
    id: 1,
    name: "News Tracker",
    description:
      "Real-time AI agent news plugin that filters and summarizes news based on your search terms. Get instant updates about AI developments, research papers, and industry trends.",
    price: 0,
    rating: 4.7,
    downloads: 1500,
    tags: ["news", "AI", "research"],
    featured: true,
    features: [
      "Real-time news updates",
      "Custom search terms",
      "Auto-summarization",
      "Topic clustering",
    ],
    downloadUrl: "/downloads/plugin-news.zip",
  };

  const plugins: Plugin[] = [
    featuredPlugin,
    {
      id: 2,
      name: "Customer Support AI",
      description:
        "Automated customer service agent with natural language processing",
      price: 0,
      rating: 4.5,
      downloads: 1200,
      tags: ["support", "automation"],
    },
    {
      id: 3,
      name: "Data Analysis Assistant",
      description: "AI-powered data analysis and visualization tool",
      price: 29.99,
      rating: 4.8,
      downloads: 850,
      tags: ["analytics", "business"],
    },
    {
      id: 4,
      name: "Email Automation Bot",
      description: "Smart email management and response automation",
      price: 0,
      rating: 4.2,
      downloads: 2000,
      tags: ["email", "productivity"],
    },
    {
      id: 5,
      name: "Sales Prediction Engine",
      description: "Advanced AI for sales forecasting and optimization",
      price: 49.99,
      rating: 4.9,
      downloads: 620,
      tags: ["sales", "prediction"],
    },
  ];

  const handleDownload = async (plugin: Plugin) => {
    if (plugin.price === 0) {
      if (plugin.id === 1 && "downloadUrl" in plugin) {
        try {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const link: any = document.createElement("a");
          link.href = plugin.downloadUrl;
          link.download = "news-tracker-plugin.zip";

          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);

          console.log("Downloading News Tracker ZIP");
        } catch (error) {
          console.error("Download failed:", error);
        }
      } else {
        console.log("Downloading free plugin:", plugin.name);
      }
    } else {
      console.log("Processing payment for:", plugin.name);
    }
  };

  const filteredPlugins = plugins.filter((plugin) => {
    if (filter === "free") return plugin.price === 0;
    if (filter === "paid") return plugin.price > 0;
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Plugin Marketplace
          </h1>
          <div className="flex flex-wrap gap-4 items-center">
            <div className="relative flex-grow max-w-xl">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Search plugins..."
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setFilter("all")}
                className={`px-4 py-2 rounded-lg ${
                  filter === "all"
                    ? "bg-blue-500 text-white"
                    : "bg-white border border-gray-200"
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilter("free")}
                className={`px-4 py-2 rounded-lg ${
                  filter === "free"
                    ? "bg-blue-500 text-white"
                    : "bg-white border border-gray-200"
                }`}
              >
                Free
              </button>
              <button
                onClick={() => setFilter("paid")}
                className={`px-4 py-2 rounded-lg ${
                  filter === "paid"
                    ? "bg-blue-500 text-white"
                    : "bg-white border border-gray-200"
                }`}
              >
                Paid
              </button>
            </div>
          </div>
        </div>

        {/* Featured Plugin */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-1">
            <div className="bg-white rounded-lg p-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <Newspaper className="w-8 h-8 text-blue-500" />
                </div>
                <div className="flex-grow">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900">
                        {featuredPlugin.name}
                      </h2>
                      <div className="flex items-center mt-1">
                        <Star className="text-yellow-400 w-4 h-4 fill-current" />
                        <span className="ml-1 text-sm text-gray-600">
                          {featuredPlugin.rating} ({featuredPlugin.downloads}{" "}
                          downloads)
                        </span>
                      </div>
                    </div>
                    <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                      Featured
                    </span>
                  </div>
                  <p className="text-gray-600 mb-4">
                    {featuredPlugin.description}
                  </p>
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    {featuredPlugin.features.map(
                      (feature: string, index: number) => (
                        <div key={index} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                          <span className="text-sm text-gray-600">
                            {feature}
                          </span>
                        </div>
                      )
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-2">
                      {featuredPlugin.tags.map((tag: string) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-gray-100 rounded-full text-sm text-gray-600"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <button
                      onClick={() => handleDownload(featuredPlugin)}
                      className="px-6 py-2 rounded-lg bg-green-500 hover:bg-green-600 text-white transition-colors flex items-center gap-2"
                    >
                      <Download size={16} />
                      Download
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Plugin Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPlugins.slice(1).map((plugin) => (
            <div
              key={plugin.id}
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-semibold text-gray-900">
                  {plugin.name}
                </h2>
                <div className="flex items-center">
                  <Star className="text-yellow-400 w-4 h-4 fill-current" />
                  <span className="ml-1 text-sm text-gray-600">
                    {plugin.rating}
                  </span>
                </div>
              </div>

              <p className="text-gray-600 mb-4">{plugin.description}</p>

              <div className="flex flex-wrap gap-2 mb-4">
                {plugin.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-gray-100 rounded-full text-sm text-gray-600"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <span className="text-lg font-semibold text-gray-900">
                    {plugin.price === 0 ? "Free" : `$${plugin.price}`}
                  </span>
                  <span className="text-sm text-gray-500 ml-2">
                    {plugin.downloads} downloads
                  </span>
                </div>
                <button
                  onClick={() => handleDownload(plugin)}
                  className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
                    plugin.price === 0
                      ? "bg-green-500 hover:bg-green-600"
                      : "bg-blue-500 hover:bg-blue-600"
                  } text-white transition-colors`}
                >
                  <Download size={16} />
                  {plugin.price === 0 ? "Download" : "Buy Now"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PluginMarketplace;
