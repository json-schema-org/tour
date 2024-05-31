import { OutputResult } from "./types";

export function outputReducer(state: OutputResult, action: any): OutputResult {
  switch (action.type) {
    case "validityStatus":
      return { ...state, validityStatus: action.payload };
    case "errors":
      return { ...state, errors: action.payload };
    case "failedTestCases":
      return { ...state, failedTestCases: action.payload };
    case "RESET":
      return { validityStatus: "valid" };

    default:
      return state;
  }
}
