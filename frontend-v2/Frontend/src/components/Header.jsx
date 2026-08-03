import { motion } from "framer-motion";
import { FaCode, FaMoon, FaSun } from "react-icons/fa";
import { useState, useEffect } from "react";

export default function Header() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "dark";
  });

  useEffect(() => {
    const root = document.documentElement;

    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

    localStorage.setItem("theme", theme);

    // Notify other components (like Monaco Editor)
    window.dispatchEvent(new Event("theme-change"));
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const containerVariants = {
    hidden: { opacity: 0, y: -12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4 },
    },
  };

  return (
    <motion.header
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="w-full bg-white dark:bg-slate-900 rounded-2xl border border-slate-300 dark:border-slate-800 shadow-xl px-6 sm:px-8 py-6 flex flex-col gap-4 transition-colors duration-300"
    >
      {/* Top Row */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        {/* Logo */}
        <div className="flex items-center gap-4">
          <motion.div
            variants={itemVariants}
            className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white shadow-lg shadow-cyan-500/20 shrink-0"
          >
            <FaCode className="text-2xl" />
          </motion.div>

          <div>
            <motion.h1
              variants={itemVariants}
              className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white"
            >
              AlgoMentor
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1"
            >
              AI-powered code review, debugging & optimization assistant
            </motion.p>
          </div>
        </div>

        {/* Theme Toggle */}
        <div className="flex items-center gap-3 self-start lg:self-center">
          <motion.button
            variants={itemVariants}
            onClick={toggleTheme}
            type="button"
            aria-label="Toggle Theme"
            className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 border border-slate-300 dark:border-slate-700 flex items-center justify-center transition-all duration-200"
          >
            {theme === "dark" ? (
              <FaMoon className="text-cyan-500" />
            ) : (
              <FaSun className="text-yellow-500" />
            )}
          </motion.button>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-slate-300 dark:border-slate-800" />
    </motion.header>
);
}