import React, { useEffect, useState } from "react";
import { Bug } from "lucide-react"; // bug icon from lucide-react
import { motion } from "framer-motion";

const IntroPage = ({ onFinish }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((old) => {
        if (old >= 100) {
          clearInterval(timer);
          setTimeout(() => onFinish(), 500); // navigate after load
          return 100;
        }
        return old + 2; // speed of progress
      });
    }, 40);
    return () => clearInterval(timer);
  }, [onFinish]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black text-yellow-400">
      {/* Bug Logo */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1, rotate: 360 }}
        transition={{ duration: 1 }}
        className="mb-6"
      >
        <Bug size={80} className="text-yellow-400" />
      </motion.div>

      {/* App Name */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="text-3xl font-bold mb-10"
      >
        Bug Tracking System
      </motion.h1>

      {/* Loading Bar */}
      <div className="w-64 h-3 bg-gray-800 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: "0%" }}
          animate={{ width: `${progress}%` }}
          transition={{ ease: "linear", duration: 0.1 }}
          className="h-full bg-yellow-400"
        />
      </div>

      {/* Loading % */}
      <p className="mt-4 text-sm">{progress}%</p>
    </div>
  );
};

export default IntroPage;
