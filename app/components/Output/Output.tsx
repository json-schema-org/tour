import React from "react";
import styles from "./Output.module.css";
import classnames from "classnames";
import { FailedTestCase, OutputResult } from "@/lib/types";
import CodeSnippet from "../CodeSnippet/CodeSnippet";

function FailedTestCasesWindow({
  failedTestCases,
}: {
  failedTestCases: FailedTestCase[];
}) {
  return (
    <div className={styles.failedTestCasesWindow}>
      <div className={styles.failedTestCasesHeader}>
        Your Schema is Invalid.
      </div>
      <div className={styles.failedTestCasesBody}>
        {failedTestCases.map((testCase, index) => (
          <div key={index} className={styles.failedTestCase}>
            <div className={styles.failedTestCaseHeader}>
              Test Case {index + 1}
            </div>
            <div className={styles.failedTestCaseBody}>
              <div className={styles.failedTestCaseTitle}>Input</div>
              <div className={styles.failedTestCaseInput}>
                <code>{JSON.stringify(testCase.input, null, 2)}</code>
              </div>
              <div className={styles.failedTestCaseTitle}>Expected Output</div>
              <div className={styles.failedTestCaseExpectedOutput}>
                {testCase.expected.toString()}
              </div>
              <div className={styles.failedTestCaseTitle}>Actual Output</div>
              <div className={styles.failedTestCaseActualOutput}>
                {testCase.actual.toString()}
              </div>
              <div className={styles.failedTestCaseError}>
                {testCase.errors}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Output({
  outputResult,
  flex,
}: {
  outputResult: OutputResult;
  flex: number;
}) {
  let textColor;

  if (outputResult.validityStatus === "neutral") {
    textColor = "neutral";
  } else if (outputResult.validityStatus === "valid") {
    textColor = "valid";
  } else if (outputResult.validityStatus === "syntaxError") {
    textColor = "invalid";
  } else {
    // invalid
    textColor = "neutral";
  }
  let outputBodyContent;
  if (outputResult.validityStatus == "neutral") {
    outputBodyContent = "Please click the validate button to see the output";
  } else if (outputResult.validityStatus == "valid") {
    outputBodyContent = "The code is valid. Let's move on to the next step";
  } else if (outputResult.validityStatus == "syntaxError") {
    outputBodyContent = "Syntax Error:" + outputResult.errors;
  } else {
    outputBodyContent = (
      <FailedTestCasesWindow failedTestCases={outputResult.failedTestCases!} />
    );
    console.log(outputResult.failedTestCases);
  }

  return (
    <div
      className={classnames(styles.output, styles[textColor])}
      style={{ flex: flex }}
    >
      <div className={styles.header}>
        <div className={styles.title}>Output </div>
      </div>
      <div className={classnames(styles.outputBody)}>{outputBodyContent}</div>
    </div>
  );
}

export default Output;
