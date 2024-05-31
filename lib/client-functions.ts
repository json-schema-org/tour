import { OutputReducerAction } from "./reducers";
import { CodeFile, FailedTestCase } from "./types";
import { schemaSafeValidate } from "./validators";

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
      }
    });
  } catch (e) {
    dispatchOutput({
      type: "syntaxError",
      payload: { errors: (e as Error).message },
    });
  }
}
