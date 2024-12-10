/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/jsx-key */
/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

import { Play, Pause, Info, BookOpen, Target, ArrowRight } from "lucide-react";

const MotionButton = motion.button;

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
  const [isPlaying, setIsPlaying] = useState(false);
  const [activePopup, setActivePopup] = useState(null);
  const [audioLoaded, setAudioLoaded] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      try {
        // Attempt to play audio on load
        audioRef.current
          .play()
          .then(() => {
            setIsPlaying(true);
          })
          .catch((error) => {
            console.warn(
              "Autoplay blocked, waiting for user interaction.",
              error
            );
          });
      } catch (error) {
        console.error("Audio playback error:", error);
      }
    }
  }, []);
  useEffect(() => {
    let unmounted = false;

    const initAudio = async () => {
      if (audioRef.current && !unmounted) {
        try {
          // Wait for audio to load
          await new Promise((resolve) => {
            audioRef.current.addEventListener("loadeddata", resolve, {
              once: true,
            });
          });

          setAudioLoaded(true);

          // Try to autoplay
          try {
            await audioRef.current.play();
            setIsPlaying(true);
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
          } catch (playError) {
            console.log("Autoplay blocked - waiting for user interaction");
          }
        } catch (error) {
          console.error("Audio initialization error:", error);
        }
      }
    };

    initAudio();

    // Cleanup function
    return () => {
      unmounted = true;
      if (audioRef.current) {
        audioRef.current.pause();
        setIsPlaying(false);
      }
    };
  }, []);
  useEffect(() => {
    if (audioRef.current) {
      // Start with lower volume and fade in
      audioRef.current.volume = 0.5;
    }
  }, [audioLoaded]);

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

      <div className="container mx-auto px-4 py-16 relative z-10 text-white h-screen flex flex-col">
        <motion.div
          style={{ textAlign: "center", marginBottom: "3rem" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        ></motion.div>

        <motion.div
          style={{ position: "fixed", top: "1rem", right: "1rem" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <button
            onClick={toggleAudio}
            className="p-3 rounded-full bg-purple-600 hover:bg-purple-700 transition-colors"
          >
            {isPlaying ? <Pause size={20} /> : <Play size={20} />}
          </button>
        </motion.div>

        <motion.div
          style={{
            position: "fixed",
            bottom: "2rem",
            left: "2rem",
            display: "flex",
            flexDirection: "row",
            gap: "1rem",
          }}
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

        <motion.div
          style={{ position: "fixed", bottom: "2rem", right: "2rem" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <MotionButton
            className="px-8 py-4 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transition-colors flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Get Started
            <ArrowRight size={20} />
          </MotionButton>
        </motion.div>

        {activePopup && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            style={{
              position: "fixed",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              padding: "1rem",
            }}
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
