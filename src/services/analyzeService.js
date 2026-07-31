import { axiosClient } from "./axiosClient";

/**
 * Sends code, language, and optional stdin to the /analyze endpoint.
 *
 * @param {string} code - The source code to analyze and execute.
 * @param {string} language - Programming language (e.g. "python", "javascript").
 * @param {string} [stdin=""] - Optional standard input for program execution.
 * @returns {Promise<Object>} Response object containing execution and analysis results.
 */
export const analyzeCode = async (code, language, stdin = "") => {
  try {
    const response = await axiosClient.post("/analyze", {
      code,
      language,
      stdin,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default analyzeCode;
