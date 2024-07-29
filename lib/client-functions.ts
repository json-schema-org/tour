import { InvalidSchemaError } from "@hyperjump/json-schema/draft-2020-12";
import { OutputReducerAction } from "./reducers";
import { CodeFile, TestCaseResult } from "./types";
import { hyperjumpCheckAnnotations, hyperjumpValidate } from "./validators";

export async function validateCode(
  codeString: string,
  codeFile: CodeFile,
  dispatchOutput: React.Dispatch<OutputReducerAction>,
  stepIndex: number,
  chapterIndex: number
) {
  const testCases = codeFile.testCases;
  try {
    const schemaCode = JSON.parse(codeString);
    const testCaseResults: TestCaseResult[] = [];
    let validationStatus: "valid" | "invalid" | "neutral" = "valid";
    const totalTestCases = testCases.length;
    for (let i = 0; i < testCases.length; i++) {
      const dataTestCase = testCases[i];

      const validationResult = await hyperjumpValidate(
        dataTestCase.input,
        schemaCode
      );
      if (codeFile.expectedAnnotations) {
        // Check if the expected annotations are present in the schema
        // If not, throw an error
        // This is a separate check from the validation
        const annotationCheckResult = await hyperjumpCheckAnnotations(
          dataTestCase.input,
          schemaCode,
          codeFile.expectedAnnotations
        );
      }

      if (validationResult.valid !== dataTestCase.expected) {
        testCaseResults.push({
          actual: validationResult.valid,
          errors:
            validationResult.errors && validationResult.errors[-1]
              ? (validationResult.errors[-1].instanceLocation as string)
              : "",
          expected: dataTestCase.expected,
          input: dataTestCase.input,
          passed: false,
        });
        validationStatus = "invalid";
      } else {
        testCaseResults.push({
          actual: validationResult.valid,
          expected: dataTestCase.expected,
          input: dataTestCase.input,
          passed: true,
        });
      }
    }

    if (validationStatus === "valid") {
      dispatchOutput({ type: "valid", payload: {} });
      completeStep(chapterIndex, stepIndex);
    } else {
      const sortedResults = testCaseResults.sort((a, b) => {
        if (a.passed === b.passed) {
          return 0; // If both are the same, their order doesn't change
        }
        return a.passed ? 1 : -1; // If a.passed is true, put a after b; if false, put a before b
      });
      dispatchOutput({
        type: "invalid",
        payload: { testCaseResults: sortedResults, totalTestCases },
      });
    }
  } catch (e) {
    if ((e as Error).message === "Invalid Schema") {
      dispatchOutput({
        type: "invalidSchema",
        payload: { errors: e as InvalidSchemaError },
      });
    } else {
      dispatchOutput({
        type: "syntaxError",
        payload: { errors: (e as Error).message },
      });
    }
  }
}

export function getBasePath() {
  return process.env.MODE === "local" ? "" : "/tour";
}

export function completeStep(chapterIndex: number, stepIndex: number) {
  // If window is undefined, we are in a server environment and we can't access localStorage
  // Don't remove this check
  if (typeof window === "undefined") return false;
  const key = `chapter-${chapterIndex}-step-${stepIndex}`;
  const progress = JSON.parse(
    localStorage.getItem("progress") ? localStorage.getItem("progress")! : "{}"
  );
  progress[key] = "completed";

  localStorage.setItem("progress", JSON.stringify(progress));
}

export function isStepCompleted(chapterIndex: number, stepIndex: number) {
  // If window is undefined, we are in a server environment and we can't access localStorage
  // Don't remove this check
  if (typeof window === "undefined") return false;

  const key = `chapter-${chapterIndex}-step-${stepIndex}`;
  const progress = JSON.parse(
    localStorage.getItem("progress") ? localStorage.getItem("progress")! : "{}"
  );
  return progress[key] === "completed";
}

export function isChapterCompleted(chapterIndex: number, totalSteps: number) {
  for (let i = 0; i < totalSteps; i++) {
    if (!isStepCompleted(chapterIndex, i)) {
      return false;
    }
  }
  return true;
}

export function hasNestedProperty(obj: any, path: string) {
  console.log(obj, path);
  const keys = path.split(".");

  let current = obj;
  for (const key of keys) {
    if (
      current === undefined ||
      current === null ||
      !Object.prototype.hasOwnProperty.call(current, key)
    ) {
      return false;
    }
    current = current[key];
  }

  // If we've made it through all the keys, the property exists
  return true;
}
