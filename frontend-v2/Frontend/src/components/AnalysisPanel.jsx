import { useApp } from "../context/AppContext";
import { motion } from "framer-motion";
import {
  FaLightbulb,
  FaClock,
  FaDatabase,
  FaRocket,
  FaCheckCircle,
  FaBookOpen,
  FaShieldAlt,
  FaWrench,
  FaExclamationTriangle,
  FaCode,
  FaInfoCircle,
} from "react-icons/fa";

// Reusable Insight Card Component - Renders only if content exists
function InsightCard({ icon: Icon, title, content, priority, iconColor }) {
  if (!content || (Array.isArray(content) && content.length === 0)) {
    return null;
  }

  const priorityStyle =
    priority === "High"
      ? "bg-red-500/10 text-red-400 border-red-500/30"
      : priority === "Medium"
        ? "bg-amber-500/10 text-amber-400 border-amber-500/30"
        : priority === "Low"
          ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
          : "bg-blue-500/10 text-blue-400 border-blue-500/30";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-300 dark:border-slate-800 hover:border-blue-500 transition-all duration-300 p-5 flex flex-col gap-3 shadow-lg"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          {Icon && <Icon className={`text-base ${iconColor || "text-blue-400"}`} />}
          <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-200 tracking-wide">{title}</h3>
        </div>
        {priority && (
          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${priorityStyle}`}>
            {priority} Priority
          </span>
        )}
      </div>
      <div className="text-xs text-slate-400 leading-relaxed font-normal mt-1">

        {Array.isArray(content) ? (
          <div className="space-y-3">

            {content.map((item, idx) => (
              <div key={idx}>

                {typeof item === "object" ? (
                  <div className="space-y-2">

                    <div className="font-semibold text-slate-900 dark:text-slate-200">
                      {item.topic}
                    </div>

                    <div className="text-slate-600 dark:text-slate-400">
                      {item.reason}
                    </div>

                    <div className="text-xs text-cyan-400">
                      Difficulty: {item.difficulty}
                    </div>


                    {item.resources && (
                      <div className="mt-3 space-y-2">

                        <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                          Learning Resources
                        </p>


                        {item.resources.map((resource, index) => (
                          <div
                            key={index}
                            className="bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-lg p-3 transition-colors duration-300"
                          >

                            <p className="text-sm font-semibold text-slate-900 dark:text-white">
                              {resource.title}
                            </p>

                            <p className="text-xs text-slate-600 dark:text-slate-400">
                              {resource.platform} • {resource.type}
                            </p>

                            <p className="text-xs text-slate-600 dark:text-slate-400">
                              Difficulty: {resource.difficulty}
                            </p>


                            <a
                              href={resource.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-block mt-2 text-xs text-cyan-400 hover:text-cyan-300 underline"
                            >
                              Open Resource →
                            </a>

                          </div>
                        ))}

                      </div>
                    )}

                  </div>

                ) : (
                  <p>{item}</p>
                )}

              </div>
            ))}

          </div>

        ) : typeof content === "object" ? (

          <pre className="whitespace-pre-wrap font-mono text-[11px] bg-slate-100 dark:bg-slate-900 p-2 rounded text-slate-700 dark:text-slate-300 overflow-x-auto">
            {JSON.stringify(content, null, 2)}
          </pre>

        ) : (

          <p>{content}</p>

        )}

      </div>
    </motion.div >
  );
}

export default function AnalysisPanel() {
  const { state } = useApp();
  const { analysis, loading, error } = state;

  const containerVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, staggerChildren: 0.08 },
    },
  };

  // Helper getters for nested backend fields
  const summary = analysis?.summary;
  const status = analysis?.status;
  const errorType = analysis?.error_type || analysis?.errorType;
  const correctness = analysis?.correctness || analysis?.code_review?.correctness;
  const readability = analysis?.readability || analysis?.code_review?.readability;
  const maintainability = analysis?.maintainability || analysis?.code_review?.maintainability;
  const variableNaming = analysis?.variable_naming || analysis?.variableNaming || analysis?.code_review?.variable_naming;
  const bestPractices = analysis?.best_practices || analysis?.bestPractices || analysis?.code_review?.best_practices;
  const timeComplexity = analysis?.time_complexity || analysis?.timeComplexity || analysis?.complexity?.time;
  const spaceComplexity = analysis?.space_complexity || analysis?.spaceComplexity || analysis?.complexity?.space;
  const reason = analysis?.reason || analysis?.optimization?.reason || analysis?.optimization_reason;
  const suggestions = analysis?.suggestions || analysis?.optimization?.suggestions || analysis?.optimization_suggestions;
  const edgeCases = analysis?.edge_cases || analysis?.edgeCases;
  const learningMaterials = analysis?.learning_materials || analysis?.learningMaterials || analysis?.learning_resources || analysis?.resources;

  const insightsList = [
    { key: "summary", title: "Summary", icon: FaLightbulb, iconColor: "text-amber-400", content: summary },
    { key: "status", title: "Status", icon: FaCheckCircle, iconColor: "text-emerald-400", content: status },
    { key: "errorType", title: "Error Type", icon: FaExclamationTriangle, iconColor: "text-red-400", priority: "High", content: errorType },
    { key: "correctness", title: "Correctness", icon: FaCheckCircle, iconColor: "text-emerald-400", content: correctness },
    { key: "readability", title: "Readability", icon: FaBookOpen, iconColor: "text-sky-400", content: readability },
    { key: "maintainability", title: "Maintainability", icon: FaWrench, iconColor: "text-emerald-400", content: maintainability },
    { key: "variableNaming", title: "Variable Naming", icon: FaCode, iconColor: "text-blue-400", content: variableNaming },
    { key: "bestPractices", title: "Best Practices", icon: FaShieldAlt, iconColor: "text-purple-400", priority: "Medium", content: bestPractices },
    { key: "timeComplexity", title: "Time Complexity", icon: FaClock, iconColor: "text-blue-400", priority: "Medium", content: timeComplexity },
    { key: "spaceComplexity", title: "Space Complexity", icon: FaDatabase, iconColor: "text-purple-400", priority: "Low", content: spaceComplexity },
    { key: "reason", title: "Optimization Reason", icon: FaInfoCircle, iconColor: "text-cyan-400", content: reason },
    { key: "suggestions", title: "Optimization Suggestions", icon: FaRocket, iconColor: "text-emerald-400", priority: "High", content: suggestions },
    { key: "edgeCases", title: "Edge Cases", icon: FaShieldAlt, iconColor: "text-amber-400", priority: "High", content: edgeCases },
    { key: "learningMaterials", title: "Learning Materials", icon: FaBookOpen, iconColor: "text-sky-400", priority: "Low", content: learningMaterials },
  ];

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="w-full h-full bg-white dark:bg-slate-900 rounded-2xl shadow-xl p-6 border border-slate-300 dark:border-slate-800 flex flex-col gap-6 transition-colors duration-300"
    >
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-300 dark:border-slate-800/80">
        <div className="flex items-center gap-2.5">
          <FaCode className="text-xl text-blue-400" />
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">Code Analysis</h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
              Detailed feedback on your code quality, complexity and improvements
            </p>
          </div>
        </div>

        {/* Animated AI Status Badge */}

      </div>

      {/* Body States */}
      {loading ? (
        /* STATE 1: LOADING STATE */
        <div className="flex-1 flex flex-col items-center justify-center p-6 gap-4 min-h-[250px] text-center">
          <div className="w-12 h-12 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin mb-2" />
          <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 tracking-wide">Analyzing your code...</h3>
          <p className="text-xs text-slate-400 max-w-xs leading-relaxed">
            Please wait while AI reviews your solution.
          </p>
          <div className="w-full space-y-3 mt-4 max-w-sm">
            <div className="h-12 bg-slate-200 dark:bg-slate-800 rounded-xl animate-pulse" />
            <div className="h-12 bg-slate-200 dark:bg-slate-800 rounded-xl animate-pulse" />
          </div>
        </div>
      ) : error ? (
        /* STATE 2: ERROR STATE */
        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center min-h-[250px]">
          <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-6 max-w-md w-full flex flex-col items-center gap-3 shadow-lg">
            <div className="w-12 h-12 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center text-xl mb-1">
              <FaExclamationTriangle />
            </div>
            <h3 className="text-base font-bold text-red-400">Analysis Error</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              {typeof error === "string" ? error : error?.message || "An unexpected error occurred during code analysis."}
            </p>
          </div>
        </div>
      ) : !analysis ? (
        /* STATE 3: EMPTY STATE */
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center gap-3 min-h-[250px]">
          <div className="w-20 h-20 rounded-full bg-slate-200 dark:bg-slate-800 border border-slate-700/50 flex items-center justify-center text-slate-600 dark:text-slate-400 shadow-inner mb-2">
            <FaCode className="text-xl text-blue-400" />
          </div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-200">No analysis yet.</h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 max-w-xs leading-relaxed">
            Run code analysis to receive suggestions and improvements.
          </p>
        </div>
      ) : (
        /* STATE 4: ANALYSIS CONTENT */
        <div className="flex-1 flex flex-col gap-4 overflow-y-auto pr-2 custom-scrollbar">
          {insightsList.map(
            (item) =>
              item.content && (
                <InsightCard
                  key={item.key}
                  icon={item.icon}
                  title={item.title}
                  iconColor={item.iconColor}
                  priority={item.priority}
                  content={item.content}
                />
              )
          )}
        </div>
      )}
    </motion.div>
  );
}
