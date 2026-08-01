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
    visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
  };

  const badgeVariants = {
    hidden: { opacity: 0, x: 15 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.header
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="w-full bg-slate-900 rounded-2xl border border-slate-800 shadow-xl px-6 sm:px-8 py-6 flex flex-col gap-4"
    >
      {/* Main Top Row */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        {/* Left Section: Logo & Branding */}
        <div className="flex items-center gap-4">
          <motion.div
            variants={itemVariants}
            className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white shadow-lg shadow-cyan-500/20 shrink-0"
          >
            <FaCode className="text-2xl text-white" />
          </motion.div>

          <div className="flex flex-col">
            <motion.h1
              variants={itemVariants}
              className="text-2xl sm:text-3xl font-bold tracking-tight text-white"
            >
              AlgoMentor
            </motion.h1>
            <motion.p
              variants={itemVariants}
              className="text-xs sm:text-sm text-slate-400 mt-0.5 font-medium"
            >
              AI-powered code review, debugging & optimization assistant
            </motion.p>
          </div>
        </div>

        {/* Right Section: Controls */}
        <div className="flex items-center gap-3 self-start lg:self-center">


          {/* Theme Button */}
          <motion.button
            variants={itemVariants}
            onClick={toggleTheme}
            type="button"
            aria-label="Toggle theme"
            className="w-10 h-10 rounded-full bg-slate-800 hover:bg-slate-700 border border-slate-700 flex items-center justify-center transition-all"
          >
            {theme === "dark" ? (
              <FaMoon className="text-cyan-400" />
            ) : (
              <FaSun className="text-yellow-400" />
            )}
          </motion.button>
          {/* Profile Avatar */}

        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-slate-800 w-full" />


    </motion.header>
  );
}
