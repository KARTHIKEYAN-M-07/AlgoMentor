import { useApp } from "../context/AppContext";
import { analyzeCode } from "../services/analyzeService";
import Editor from "@monaco-editor/react";
import { motion } from "framer-motion";
import {
  FaCode,
  FaRobot,
  FaCopy,
  FaClipboard,
  FaAlignLeft,
  FaTrashAlt,
  FaDownload,
} from "react-icons/fa";

export default function EditorPanel() {
  const {
    state,
    setCode,
    setLanguage,
    setLoading,
    setExecution,
    setAnalysis,
    setError,
    resetExecution,
    resetAnalysis,
  } = useApp();

  const code = state.code;
  const language = state.language;

  const lineCount = code ? code.split("\n").length : 0;
  const characterCount = code ? code.length : 0;

  const handleAnalyze = async () => {
    if (!code || !code.trim()) {
      alert("Please write some code before analyzing.");
      return;
    }

    try {
      setLoading(true);
      resetExecution();
      resetAnalysis();
      setError(null);

      const result = await analyzeCode(code, language, state.stdin || "");

      if (result) {
        if (result.execution) {
          setExecution(result.execution);
        }
        if (result.analysis) {
          setAnalysis(result.analysis);
        }
      }
    } catch (error) {
      const errorMessage =
        error?.response?.data?.detail ||
        error?.response?.data?.message ||
        error?.message ||
        "Unable to connect to the backend.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };
  const handleCopy = async () => {
    if (!code) return;

    try {
      await navigator.clipboard.writeText(code);
    } catch (error) {
      alert("Unable to copy code.");
      console.error(error);
    }
  };
  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();

      if (text) {
        setCode(text);
      }
    } catch (error) {
      alert("Clipboard access denied.");
      console.error(error);
    }
  };
  const handleClear = () => {
    setCode("");
  };

  const handleDownload = () => {
    if (!code) return;

    const extensions = {
      python: "py",
      javascript: "js",
      java: "java",
      cpp: "cpp",
      c: "c",
      go: "go",
      rust: "rs",
      kotlin: "kt",
    };

    const blob = new Blob([code], {
      type: "text/plain",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;
    link.download = `code.${extensions[language] || "txt"}`;

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  const actionIcons = [
    { name: "Copy", icon: FaCopy, label: "Copy Code", onClick: handleCopy },
    { name: "Paste", icon: FaClipboard, label: "Paste Code", onClick: handlePaste },
    {
      name: "Format", icon: FaAlignLeft, label: "Format Code", onClick: () => {
        alert("Code formatting will be available in a future update.");
      }
    },
    { name: "Clear", icon: FaTrashAlt, label: "Clear Editor", onClick: handleClear },
    { name: "Download", icon: FaDownload, label: "Download File", onClick: handleDownload },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full h-full bg-slate-900 rounded-2xl border border-slate-800 shadow-xl overflow-hidden flex flex-col justify-between"
    >
      {/* Top Section */}
      <div className="p-6 flex flex-col gap-4">
        {/* TOP TOOLBAR */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800/80">
          {/* Left Title */}
          <div>
            <div className="flex items-center gap-2">
              <FaCode className="text-blue-400 text-lg" />
              <h2 className="text-xl font-bold text-white tracking-tight">Code Editor</h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Write, test and improve your code using AI.
            </p>
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-3 self-start sm:self-auto">
            <label htmlFor="editor-language-select" className="sr-only">
              Select Programming Language
            </label>
            <select
              id="editor-language-select"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="bg-slate-800 text-slate-200 border border-slate-700 rounded-xl px-3.5 py-1.5 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all cursor-pointer"
            >
              <option value="python">Python</option>
              <option value="java">Java</option>
              <option value="cpp">C++</option>
              <option value="javascript">JavaScript</option>
              <option value="c">C</option>
              <option value="go">Go</option>
              <option value="rust">Rust</option>
              <option value="kotlin">Kotlin</option>
            </select>

            <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 rounded-full px-2.5 py-1 text-xs font-semibold flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Ready
            </span>
          </div>
        </div>

        {/* SECOND TOOLBAR (VS Code Action Icons) */}
        <div className="flex items-center gap-1.5 py-1">
          {actionIcons.map((action) => {
            const IconComponent = action.icon;
            return (
              <div key={action.name} className="relative group">
                <button
                  type="button"
                  onClick={action.onClick}
                  aria-label={action.label}
                  className="p-2 rounded-lg bg-slate-800/60 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-700/50 transition-all duration-150 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <IconComponent className="text-xs" />
                </button>

                {/* Tooltip */}
                <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-1.5 hidden group-hover:block bg-slate-950 text-slate-200 text-[10px] font-medium px-2 py-1 rounded border border-slate-800 whitespace-nowrap z-20 shadow-md">
                  {action.label}
                </div>
              </div>
            );
          })}
        </div>

        {/* MAIN EDITOR */}
        <div className="rounded-xl border border-slate-800/80 overflow-hidden shadow-inner bg-slate-950">
          <Editor
            height="540px"
            language={language}
            theme="vs-dark"
            value={code}
            onChange={(val) => setCode(val || "")}
            options={{
              automaticLayout: true,
              minimap: { enabled: false },
              wordWrap: "on",
              fontSize: 15,
              fontFamily: "JetBrains Mono, monospace",
              cursorSmoothCaretAnimation: "on",
              lineNumbers: "on",
              renderLineHighlight: "all",
            }}
          />
        </div>
      </div>

      {/* BOTTOM BAR (VS Code Status Bar style) */}
      <div className="bg-slate-950/80 border-t border-slate-800 px-6 py-3 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Left Stats */}
        <div className="flex items-center gap-4 text-xs font-mono text-slate-400">
          <span>
            Chars: <strong className="text-slate-200">{characterCount}</strong>
          </span>
          <span>•</span>
          <span>
            Lines: <strong className="text-slate-200">{lineCount}</strong>
          </span>
          <span>•</span>
          <span className="uppercase text-blue-400 font-semibold">{language}</span>
        </div>

        {/* Right Analyze Button */}
        <button
          type="button"
          onClick={handleAnalyze}
          className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-semibold px-6 py-2.5 rounded-xl shadow-lg shadow-blue-500/20 hover:shadow-cyan-500/30 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer flex items-center justify-center gap-2"
        >
          <FaRobot className="text-lg" />
          <span>Analyze Code</span>
        </button>
      </div>
    </motion.div>
  );
}