import { InvalidSchemaError } from "@hyperjump/json-schema/draft-2020-12";
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
    for (let i = 0; i < testCases.length; i++) {
      const dataTestCase = testCases[i];
      const validationResult = await hyperjumpValidate(
        dataTestCase.input,
        schemaCode
      );

      if (validationResult.valid !== dataTestCase.expected) {
        failedTestCases.push({
          actual: validationResult.valid,
          errors:
            validationResult.errors && validationResult.errors[-1]
              ? (validationResult.errors[-1].instanceLocation as string)
              : "",
          expected: dataTestCase.expected,
          input: dataTestCase.input,
        });
        validationStatus = "invalid";
      }
    }
    if (validationStatus === "valid") {
      dispatchOutput({ type: "valid", payload: {} });
    } else {
      dispatchOutput({
        type: "invalid",
        payload: { failedTestCases, totalTestCases },
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
