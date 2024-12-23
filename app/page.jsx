"use client";

import React, { useState, useRef, useEffect } from "react";

import Image from "next/image";
import { motion } from "framer-motion";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useWallet } from "@solana/wallet-adapter-react";
import { useRouter } from "next/navigation";
import { Play, Pause, Info, BookOpen, Target } from "lucide-react";

// const MotionButton = motion.button;

const FireParticle = () => (
  <motion.div
    style={{
      position: "absolute",
      width: "0.5rem",
      height: "0.5rem",
      backgroundColor: "#f97316",
      borderRadius: "9999px",
    }}
    initial={{
      opacity: 0,
      y: 0,
      x: Math.random() * 100 - 50,
    }}
    animate={{
      opacity: [0, 1, 0],
      y: -100,
      x: Math.random() * 100 - 50,
    }}
    transition={{
      duration: 2,
      repeat: Infinity,
      ease: "easeOut",
    }}
  />
);

const FireEffect = () => (
  <div className="absolute bottom-0 left-0 w-full h-64 opacity-30">
    {[...Array(20)].map((_, i) => (
      <FireParticle key={i} />
    ))}
  </div>
);

const ChimeraLanding = () => {
  const router = useRouter();
  const { connected } = useWallet();
  const [isPlaying, setIsPlaying] = useState(false);
  const [activePopup, setActivePopup] = useState(null);
  const [audioLoaded, setAudioLoaded] = useState(false);
  const audioRef = useRef(null);

  // Handle wallet connection and routing
  useEffect(() => {
    if (connected) {
      router.push("/selectoption");
    }
  }, [connected, router]);

  useEffect(() => {
    let mounted = true;

    const initAudio = async () => {
      if (audioRef.current && mounted) {
        try {
          audioRef.current.volume = 0.5;
          await audioRef.current.play();
          setIsPlaying(true);
          setAudioLoaded(true);
        } catch (error) {
          console.warn(
            "Autoplay blocked, waiting for user interaction:",
            error
          );
          setAudioLoaded(true);
        }
      }
    };

    initAudio();

    return () => {
      mounted = false;
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  const toggleAudio = async () => {
    if (audioRef.current) {
      try {
        if (isPlaying) {
          await audioRef.current.pause();
        } else {
          await audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
      } catch (error) {
        console.error("Audio playback error:", error);
      }
    }
  };

  const popupContent = {
    lore: "Ancient myths speak of the Chimera, a fearsome creature born of chaos and divine power. With the head of a lion, body of a goat, and tail of a serpent, it represented the untameable forces of nature.",
    bio: "We are dreamers, innovators, and creators who believe in pushing the boundaries of what's possible. Like the mythical Chimera, we combine different elements to create something extraordinary.",
    mission:
      "Our mission is to harness the power of hybrid innovation, creating solutions that transcend traditional boundaries and reshape the future of technology.",
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <audio
        ref={audioRef}
        loop
        preload="auto"
        src="audio.mp3"
        className="hidden"
        onError={(e) => console.error("Audio loading error:", e)}
      />

      {/* Background gradients */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[#E9FCFF]" />
        <div
          className="absolute inset-0 bg-[#6F7EFF]"
          style={{ clipPath: "polygon(100% 0, 100% 100%, 0 100%)" }}
        />
      </div>

      <div className="absolute inset-0 pointer-events-none">
        <FireEffect />
      </div>

      {/* Chimera Image */}
      <motion.div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        initial={{ opacity: 0.3 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <Image
          width={550}
          height={550}
          alt="chimera"
          src="https://res.cloudinary.com/dtfvdjvyr/image/upload/v1733783816/Chimaera_smmhep.png"
        />
      </motion.div>

      {/* Main content box */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="absolute left-8 top-20 -translate-y-1/2 z-20 p-8 rounded-xl backdrop-blur-md bg-white/10 border border-white/20 shadow-lg max-w-lg"
      >
        <h1 className="text-4xl font-bold mb-4 text-[#03DBFE] bg-clip-text text-transparent">
          Power Meets Possibility
        </h1>
        <p className="text-lg text-black leading-relaxed">
          Chimera is a universal AI assistant marketplace that fuses strategy
          and intelligence to drive unstoppable growth.
        </p>
        <ul className="mt-4 space-y-2 text-black">
          <li className="flex items-center gap-2">🦁 Digital Transformation</li>
          <li className="flex items-center gap-2">
            🦁 Ai-agents That Works for You
          </li>
          <li className="flex items-center gap-2">🦁 Processes That Evolve</li>
        </ul>
        <p className="mt-4 text-black">
          Ready to turn potential into progress? Get started now.
        </p>
      </motion.div>

      <div className="relative z-30">
        {/* Audio control */}
        <motion.div
          className="fixed top-4 right-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <button
            onClick={toggleAudio}
            className={`p-3 rounded-full ${
              audioLoaded
                ? "bg-purple-600 hover:bg-purple-700"
                : "bg-purple-400 cursor-wait"
            } transition-colors`}
          >
            {isPlaying ? <Pause size={20} /> : <Play size={20} />}
          </button>
        </motion.div>

        {/* Navigation buttons */}
        <motion.div
          className="fixed bottom-8 left-8 flex flex-row gap-4"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          {["lore", "bio", "mission"].map((item) => (
            <motion.button
              key={item}
              onClick={() => setActivePopup(activePopup === item ? null : item)}
              className="px-6 py-3 rounded-lg bg-[#77FFD8] text-black hover:bg-[#6F7EFF] transition-colors flex items-center gap-2 w-40"
              whileHover={{ scale: 1.05, x: 10 }}
              whileTap={{ scale: 0.95 }}
            >
              {item === "lore" && <BookOpen size={20} />}
              {item === "bio" && <Info size={20} />}
              {item === "mission" && <Target size={20} />}
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </motion.button>
          ))}
        </motion.div>

        {/* Wallet button */}
        <motion.div
          className="fixed bottom-8 right-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <WalletMultiButton className="px-8 py-4 rounded-lg bg-[#ad98f8] hover:bg-[#ad98f8]/80 transition-colors">
            Get Started
          </WalletMultiButton>
        </motion.div>

        {/* Popup */}
        {activePopup && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-0 flex items-center justify-center bg-black/50 p-4 z-40"
            onClick={() => setActivePopup(null)}
          >
            <div
              className="bg-slate-800 p-6 rounded-lg max-w-md"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-2xl font-bold mb-4 capitalize">
                {activePopup}
              </h2>
              <p className="text-gray-300">{popupContent[activePopup]}</p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ChimeraLanding;
