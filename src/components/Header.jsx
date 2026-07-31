import { motion } from "framer-motion";
import { FaRobot, FaBolt, FaMoon, FaBrain, FaServer } from "react-icons/fa";

export default function Header() {
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
            <FaRobot className="text-2xl text-white" />
          </motion.div>

          <div className="flex flex-col">
            <motion.h1
              variants={itemVariants}
              className="text-2xl sm:text-3xl font-bold tracking-tight text-white"
            >
              Personalized Coding Mentor
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
          {/* Badge */}
          <motion.div variants={badgeVariants}>
            <span className="rounded-full px-3.5 py-1 text-xs font-semibold bg-blue-500/10 border border-blue-500/30 text-blue-400 flex items-center gap-1.5 shadow-sm">
              <FaBolt className="text-blue-400 text-xs" />
              <span>Hackathon Demo</span>
            </span>
          </motion.div>

          {/* Theme Button */}
          <motion.button
            variants={itemVariants}
            type="button"
            aria-label="Toggle theme"
            className="w-10 h-10 rounded-full bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60 flex items-center justify-center text-slate-300 hover:text-white transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <FaMoon className="text-base" />
          </motion.button>

          {/* Profile Avatar */}
          <motion.div
            variants={itemVariants}
            aria-label="User profile"
            role="img"
            className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-cyan-600 text-white font-bold text-sm flex items-center justify-center shadow-md hover:scale-105 transition-transform cursor-pointer"
          >
            KM
          </motion.div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-slate-800 w-full" />

      {/* Bottom Status Row */}
      <motion.div
        variants={containerVariants}
        className="flex items-center gap-3 flex-wrap"
      >
        <motion.div
          variants={itemVariants}
          className="rounded-full border border-slate-800 bg-slate-950/50 px-3 py-1 text-xs font-medium text-slate-300 flex items-center gap-2 shadow-inner"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>AI Ready</span>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="rounded-full border border-slate-800 bg-slate-950/50 px-3 py-1 text-xs font-medium text-slate-300 flex items-center gap-2 shadow-inner"
        >
          <FaServer className="text-emerald-400 text-xs" />
          <span>Judge0 Connected</span>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="rounded-full border border-slate-800 bg-slate-950/50 px-3 py-1 text-xs font-medium text-slate-300 flex items-center gap-2 shadow-inner"
        >
          <FaBrain className="text-emerald-400 text-xs" />
          <span>Ollama Ready</span>
        </motion.div>
      </motion.div>
    </motion.header>
  );
}
