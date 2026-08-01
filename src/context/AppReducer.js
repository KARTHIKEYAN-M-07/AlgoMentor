// ===========================================
// Action Types
// ===========================================

export const ACTION_TYPES = {
  SET_CODE: "SET_CODE",
  SET_LANGUAGE: "SET_LANGUAGE",
  SET_STDIN: "SET_STDIN",
  SET_LOADING: "SET_LOADING",
  SET_EXECUTION: "SET_EXECUTION",
  SET_ANALYSIS: "SET_ANALYSIS",
  SET_ERROR: "SET_ERROR",
  RESET_ANALYSIS: "RESET_ANALYSIS",
  RESET_EXECUTION: "RESET_EXECUTION",
  RESET_ALL: "RESET_ALL",
};

// ===========================================
// Initial State
// ===========================================

export const initialState = {
  code: "",
  language: "python",
  stdin: "",
  loading: false,
  execution: null,
  analysis: null,
  error: null,
};

// ===========================================
// Reducer
// ===========================================

export function appReducer(state = initialState, action) {
  switch (action.type) {
    case ACTION_TYPES.SET_CODE:
      return {
        ...state,
        code: action.payload,
      };

    case ACTION_TYPES.SET_LANGUAGE:
      return {
        ...state,
        language: action.payload,
      };

    case ACTION_TYPES.SET_STDIN:
      return {
        ...state,
        stdin: action.payload,
      };

    case ACTION_TYPES.SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };

    case ACTION_TYPES.SET_EXECUTION:
      return {
        ...state,
        execution: action.payload,
        loading: false,
        error: null,
      };

    case ACTION_TYPES.SET_ANALYSIS:
      return {
        ...state,
        analysis: action.payload,
        loading: false,
        error: null,
      };

    case ACTION_TYPES.SET_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case ACTION_TYPES.RESET_ANALYSIS:
      return {
        ...state,
        analysis: null,
      };

    case ACTION_TYPES.RESET_EXECUTION:
      return {
        ...state,
        execution: null,
      };

    case ACTION_TYPES.RESET_ALL:
      return {
        ...initialState,
      };

    default:
      return state;
  }
}

export default appReducer;