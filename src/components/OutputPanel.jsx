import { useApp } from "../context/AppContext";
import { motion } from "framer-motion";
import {
  FaTerminal,
  FaCopy,
  FaTrashAlt,
  FaDownload,
  FaCheckCircle,
  FaExclamationTriangle,
  FaClock,
  FaMemory,
  FaCoins,
} from "react-icons/fa";

// Reusable Metric Card Component
function MetricCard({ title, value, icon: Icon, colorClass, borderClass }) {
  if (value === undefined || value === null || value === "") return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className={`bg-slate-100 dark:bg-slate-950 rounded-xl p-3.5 border ${borderClass || "border-slate-300 dark:border-slate-800/80"
        } flex items-center justify-between shadow-sm hover:border-slate-400 dark:hover:border-slate-700 transition-all`}
    >
      <div className="flex flex-col gap-0.5">
        <span className="text-[11px] font-medium text-slate-600 dark:text-slate-400 uppercase tracking-wider">
          {title}
        </span>
        <span className="text-sm sm:text-base font-bold text-slate-900 dark:text-white tracking-tight">
          {value}
        </span>
      </div>
      {Icon && <Icon className={`text-lg ${colorClass || "text-blue-400"}`} />}
    </motion.div>
  );
}

export default function OutputPanel() {
  const { state, resetExecution } = useApp();
  const { execution, loading } = state;

  const stdout = execution?.stdout;
  const stderr = execution?.stderr;
  const compileOutput = execution?.compile_output || execution?.compileOutput;
  const status = execution?.status;
  const time = execution?.time;
  const memory = execution?.memory;
  const creditsRemaining =
    execution?.credits_remaining ?? execution?.creditsRemaining;

  const isSuccess =
    status === "success" ||
    status === "SUCCESS" ||
    (!stderr && !compileOutput && execution);

  const containerVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, staggerChildren: 0.08 },
    },
  };

  const handleCopy = () => {
    const outputText = [
      stdout ? `--- Standard Output ---\n${stdout}` : "",
      stderr ? `--- Runtime Error ---\n${stderr}` : "",
      compileOutput ? `--- Compiler Output ---\n${compileOutput}` : "",
    ]
      .filter(Boolean)
      .join("\n\n");

    if (outputText) {
      navigator.clipboard.writeText(outputText);
    }
  };

  const handleDownload = () => {
    const outputText = [
      stdout ? `--- Standard Output ---\n${stdout}` : "",
      stderr ? `--- Runtime Error ---\n${stderr}` : "",
      compileOutput ? `--- Compiler Output ---\n${compileOutput}` : "",
    ]
      .filter(Boolean)
      .join("\n\n");

    if (!outputText) return;

    const blob = new Blob([outputText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "execution_output.txt";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="w-full bg-white dark:bg-slate-900 rounded-2xl border border-slate-300 dark:border-slate-800 shadow-xl overflow-hidden p-6 flex flex-col gap-5 transition-colors duration-300"
    >
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-300 dark:border-slate-800/80">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700/60 flex items-center justify-center text-blue-500 dark:text-blue-400 shadow-sm transition-colors duration-300">
            <FaTerminal className="text-lg" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
              Program Output
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-0.5">
              View your program output and execution details
            </p>
          </div>
        </div>

        {/* Right Toolbar Buttons */}
        <div className="flex items-center gap-3 self-start sm:self-auto">
          <button
            type="button"
            onClick={handleCopy}
            aria-label="Copy Output"
            className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 border border-slate-300 dark:border-slate-700 transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <FaCopy className="text-xs" />
          </button>
          <button
            type="button"
            onClick={resetExecution}
            aria-label="Clear Terminal"
            className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 border border-slate-300 dark:border-slate-700 transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <FaTrashAlt className="text-xs" />
          </button>
          <button
            type="button"
            onClick={handleDownload}
            aria-label="Download Log"
            className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 border border-slate-300 dark:border-slate-700 transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <FaDownload className="text-xs" />
          </button>
        </div>
      </div>

      {/* BODY STATES */}
      {loading ? (
        /* STATE 1: LOADING STATE */
        <div className="flex-1 flex flex-col items-center justify-center p-8 gap-4 min-h-[180px] text-center">
          <div className="w-12 h-12 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin mb-2" />
          <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">Executing Program...</h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 max-w-xs leading-relaxed">
            Waiting for compiler response...
          </p>
        </div>
      ) : !execution ? (
        /* STATE 2: EMPTY STATE */
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center gap-3 min-h-[180px]">
          <div className="w-16 h-16 rounded-full bg-slate-200 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 flex items-center justify-center text-slate-400 shadow-inner mb-1">
            <FaTerminal className="text-3xl text-blue-400" />
          </div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-200">
            No output yet
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 max-w-xs leading-relaxed">
            Run your code to see the execution results here.
          </p>
        </div>
      ) : (
        /* STATE 3: EXECUTION RESULTS */
        <div className="flex flex-col gap-5">
          {/* Metrics Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
            {status && (
              <MetricCard
                title="Execution Status"
                value={status}
                icon={isSuccess ? FaCheckCircle : FaExclamationTriangle}
                colorClass={isSuccess ? "text-emerald-400" : "text-red-400"}
                borderClass={
                  isSuccess ? "border-emerald-500/30" : "border-red-500/30"
                }
              />
            )}

            {time && (
              <MetricCard
                title="Execution Time"
                value={typeof time === "number" ? `${time}s` : time}
                icon={FaClock}
                colorClass="text-blue-400"
              />
            )}

            {memory && (
              <MetricCard
                title="Memory Usage"
                value={typeof memory === "number" ? `${memory} KB` : memory}
                icon={FaMemory}
                colorClass="text-purple-400"
              />
            )}


          </div>

          {/* Standard Output Block */}
          {stdout && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-xl border border-slate-300 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 overflow-hidden shadow-inner flex flex-col transition-colors duration-300"
            >
              <div className="bg-slate-100 dark:bg-slate-900 px-4 py-2 border-b border-slate-300 dark:border-slate-800/80 flex items-center justify-between text-xs font-mono text-slate-600 dark:text-slate-400">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="font-semibold text-slate-700 dark:text-slate-300">Standard Output</span>
                </div>
              </div>
              <pre className="max-h-72 overflow-y-auto overflow-x-auto p-4 font-mono text-xs sm:text-sm text-slate-900 dark:text-slate-200 whitespace-pre-wrap leading-relaxed">
                {stdout}
              </pre>
            </motion.div>
          )}

          {/* Runtime Error Block (Red) */}
          {stderr && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-xl border border-red-500/40 bg-red-50 dark:bg-red-950/20 overflow-hidden shadow-inner flex flex-col"
            >
              <div className="bg-red-900/30 px-4 py-2 border-b border-red-500/30 flex items-center justify-between text-xs font-mono text-red-400">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
                  <span className="font-semibold text-red-300">Runtime Error (stderr)</span>
                </div>
              </div>
              <pre className="p-4 font-mono text-xs sm:text-sm text-red-400 overflow-x-auto whitespace-pre-wrap leading-relaxed">
                {stderr}
              </pre>
            </motion.div>
          )}

          {/* Compiler Output Block (Amber) */}
          {compileOutput && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-xl border border-amber-500/40 bg-amber-50 dark:bg-amber-950/20 overflow-hidden shadow-inner flex flex-col"
            >
              <div className="bg-amber-900/30 px-4 py-2 border-b border-amber-500/30 flex items-center justify-between text-xs font-mono text-amber-400">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                  <span className="font-semibold text-amber-300">Compiler Output</span>
                </div>
              </div>
              <pre className="p-4 font-mono text-xs sm:text-sm text-amber-400 overflow-x-auto whitespace-pre-wrap leading-relaxed">
                {compileOutput}
              </pre>
            </motion.div>
          )}
        </div>
      )}
    </motion.div>
  );
}
