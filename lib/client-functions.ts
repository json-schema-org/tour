import { OutputReducerAction } from "./reducers";
import { CodeFile, FailedTestCase } from "./types";
import { hyperjumpValidate, schemaSafeValidate } from "./validators";

export async function validateCode(
  codeString: string,
  codeFile: CodeFile,
  dispatchOutput: React.Dispatch<OutputReducerAction>
) {
  const testCases = codeFile.testCases;
  try {
    const schemaCode = JSON.parse(codeString);
    const failedTestCases: FailedTestCase[] = [];
    let validationStatus: "valid" | "invalid" | "neutral" = "valid";
    const totalTestCases = testCases.length;
    testCases.forEach((dataTestCase, i) => {
      const validationResult = schemaSafeValidate(
        dataTestCase.input,
        schemaCode
      );

      if (validationResult.valid !== dataTestCase.expected) {
        failedTestCases.push({
          actual: validationResult.valid,
          errors: validationResult.errors,
          expected: dataTestCase.expected,
          input: dataTestCase.input,
        });
        validationStatus = "invalid";
      }
    });
    if (validationStatus === "valid") {
      dispatchOutput({ type: "valid", payload: {} });
    } else {
      dispatchOutput({
        type: "invalid",
        payload: { failedTestCases, totalTestCases },
      });
    }
  } catch (e) {
    console.log("error");
    dispatchOutput({
      type: "syntaxError",
      payload: { errors: (e as Error).message },
    });
  }
}