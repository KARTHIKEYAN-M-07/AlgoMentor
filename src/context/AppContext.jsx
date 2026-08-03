import React, {
  createContext,
  useContext,
  useMemo,
  useReducer,
} from "react";
import { appReducer, initialState, ACTION_TYPES } from "./AppReducer";

// ===========================================
// Context
// ===========================================

export const AppContext = createContext(null);

// ===========================================
// Provider
// ===========================================

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // ===========================================
  // Action Helpers
  // ===========================================

  const setCode = (code) =>
    dispatch({ type: ACTION_TYPES.SET_CODE, payload: code });

  const setLanguage = (language) =>
    dispatch({ type: ACTION_TYPES.SET_LANGUAGE, payload: language });

  const setStdin = (stdin) =>
    dispatch({ type: ACTION_TYPES.SET_STDIN, payload: stdin });

  const setLoading = (loading) =>
    dispatch({ type: ACTION_TYPES.SET_LOADING, payload: loading });

  const setExecution = (execution) =>
    dispatch({ type: ACTION_TYPES.SET_EXECUTION, payload: execution });

  const setAnalysis = (analysis) =>
    dispatch({ type: ACTION_TYPES.SET_ANALYSIS, payload: analysis });

  const setError = (error) =>
    dispatch({ type: ACTION_TYPES.SET_ERROR, payload: error });

  const resetAnalysis = () =>
    dispatch({ type: ACTION_TYPES.RESET_ANALYSIS });

  const resetExecution = () =>
    dispatch({ type: ACTION_TYPES.RESET_EXECUTION });

  const resetAll = () =>
    dispatch({ type: ACTION_TYPES.RESET_ALL });

  // ===========================================
  // Memoized Context Value
  // ===========================================

  const value = useMemo(
    () => ({
      state,
      dispatch,
      setCode,
      setLanguage,
      setStdin,
      setLoading,
      setExecution,
      setAnalysis,
      setError,
      resetAnalysis,
      resetExecution,
      resetAll,
    }),
    [state]
  );

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

// ===========================================
// Custom Hook
// ===========================================

export function useApp() {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("useApp must be used inside AppProvider");
  }

  return context;
}

export default AppContext;