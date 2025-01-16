"use client";

import React, { useState } from "react";
import { Search, Download, Star, Filter } from "lucide-react";

interface Character {
  name: string;
  modelProvider: string;
  bio: string[];
  topics: string[];
  adjectives: string[];
  messageExamples: { user: string; content: { text: string } }[][];
}

const CharacterCard = ({ character }: { character: Character }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
      <div className="p-6 border-b border-gray-100">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-semibold text-gray-900">
              {character.name}
            </h3>
            <p className="text-sm text-gray-500">{character.modelProvider}</p>
          </div>
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <Star className="w-5 h-5 text-gray-400 hover:text-yellow-400" />
          </button>
        </div>

        <div className="space-y-3">
          <p className="text-gray-600 line-clamp-2">{character.bio[0]}</p>

          <div className="mt-4 space-y-4">
            <div>
              <h4 className="text-sm font-semibold text-gray-700 mb-2">
                Topics
              </h4>
              <div className="flex flex-wrap gap-2">
                {character.topics.slice(0, 5).map((topic, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                  >
                    {topic}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-gray-700 mb-2">
                Personality
              </h4>
              <div className="flex flex-wrap gap-2">
                {character.adjectives.slice(0, 4).map((adj, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-purple-100 text-purple-600 text-xs rounded-full"
                  >
                    {adj}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-gray-700 mb-2">
                Message Examples
              </h4>
              <div className="space-y-2">
                {character.messageExamples[0].map((msg, index) => (
                  <div
                    key={index}
                    className={`p-2 rounded ${
                      msg.user === character.name ? "bg-blue-50" : "bg-gray-50"
                    }`}
                  >
                    <p className="text-xs font-medium mb-1">{msg.user}</p>
                    <p className="text-sm text-gray-600">{msg.content.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 py-4 bg-gray-50 flex justify-between items-center">
        <button className="w-full px-4 py-2 bg-[#77FFD9] text-black rounded-lg hover:bg-black hover:text-white transition-colors flex justify-center items-center gap-2">
          <Download className="w-4 h-4 " />
          Downlaod Character
        </button>
      </div>
    </div>
  );
};

const CharacterMarketplace = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Example categories based on character types
  const categories = [
    "All",
    "Assistants",
    "Personalities",
    "Fiction",
    "Historical",
  ];

  // Example characters array containing our two characters
  const characters = [
    {
      name: "Sheldon Cooper",
      modelProvider: "",
      bio: [
        "A genius theoretical physicist with an IQ of 187.",
        "Obsessed with logic, science, and the importance of order. Known for his sarcastic humor and lack of social skills.",
        "Loves comic books, video games, and Star Trek.",
      ],
      topics: [
        "Physics",
        "Comics",
        "Video Games",
        "Science",
        "Star Trek",
        "Logic",
      ],
      adjectives: ["Brilliant", "Logical", "Sarcastic", "Quirky", "Obsessive"],
      messageExamples: [
        [
          {
            user: "User",
            content: {
              text: "Hey Sheldon, what's your favorite superhero ?",
            },
          },
          {
            user: "Sheldon Cooper",
            content: {
              text: "Ah, a question about superheroes. My favorite is The Flash—speed is the greatest form of logic!",
            },
          },
        ],
      ],
    },
    {
      name: "Tony Stark",
      modelProvider: "",
      bio: [
        "Genius, billionaire, playboy, philanthropist.",
        "Creator of the Iron Man suit and leader in clean energy.",
      ],
      topics: ["Technology", "Innovation", "Engineering", "Leadership"],
      adjectives: ["Brilliant", "Charismatic", "Confident", "Witty"],
      messageExamples: [
        [
          {
            user: "User",
            content: { text: "How do you handle pressure?" },
          },
          {
            user: "Tony Stark",
            content: {
              text: "Pressure? I thrive on it. It's just another excuse to be awesome.",
            },
          },
        ],
      ],
      colorScheme: {
        primary: "red",
        secondary: "yellow",
        accent: "gold",
      },
    },
  ];

  // Filter characters based on search query and category
  const filteredCharacters = characters.filter((char) => {
    const matchesSearch =
      char.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      char.bio[0].toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || char.topics.includes(selectedCategory);
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            AI Character Marketplace
          </h1>
          <p className="text-xl text-gray-600">
            Discover and D unique AI personalities for your projects
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="mb-8 flex flex-col md:flex-row gap-4 items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search characters..."
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex gap-4">
            <select
              className="px-4 py-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>

            <button className="px-4 py-3 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 flex items-center gap-2">
              <Filter className="w-5 h-5" />
              Filters
            </button>
          </div>
        </div>

        {/* Character Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCharacters.map((character, index) => (
            <CharacterCard key={index} character={character} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CharacterMarketplace;
