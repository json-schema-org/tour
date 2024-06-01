import { OutputResult } from "./types";

export type OutputReducerAction = {
  type: "valid" | "syntaxError" | "invalid" | "RESET";
  payload?: any;
};

export type OutputReducer = (
  state: OutputResult,
  action: OutputReducerAction
) => OutputResult;

export function outputReducer(
  state: OutputResult,
  action: OutputReducerAction
): OutputResult {
  switch (action.type) {
    case "valid":
      return { ...state, validityStatus: "valid" };
    case "syntaxError":
      return {
        ...state,
        errors: action.payload.errors,
        validityStatus: "syntaxError",
      };
    case "invalid":
      return {
        ...state,
        failedTestCases: action.payload.failedTestCases,
        totalTestCases: action.payload.totalTestCases,
        validityStatus: "invalid",
      };
    case "RESET":
      return { validityStatus: "neutral" };

    default:
      return state;
  }
}
