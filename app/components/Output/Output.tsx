import React, { useState } from "react";
import styles from "./Output.module.css";
import classnames from "classnames";
import { FailedTestCase, OutputResult } from "@/lib/types";

function TestCaseTab({
  isActive,
  index,
  setIsActive,
}: {
  isActive: boolean;
  index: number;
  setIsActive: (index: number) => void;
}) {
  return (
    <div
      className={classnames(
        styles.testCaseTab,
        isActive && styles.activeTestCaseTab
      )}
      onClick={() => setIsActive(index)}
    >
      Case {index + 1}
    </div>
  );
}

function FailedTestCaseItem({
  testCase,
  index,
}: {
  testCase: FailedTestCase;
  index: number;
}) {
  return (
    <div className={styles.failedTestCase}>
      <div className={styles.failedTestCaseBody}>
        <span className={styles.failedTestCaseTitle}>Expected Output:</span>
        <span>{testCase.expected ? "valid" : "invalid"}</span>
        <span className={styles.failedTestCaseTitle}>Actual Output:</span>
        <span>{testCase.actual ? "valid" : "invalid"}</span>
        <br />
        <div className={styles.failedTestCaseCode}>
          {JSON.stringify(testCase.input, null, 2)}
        </div>
        <div className={styles.failedTestCaseError}>
          {testCase.errors &&
            testCase.errors.map((i) => {
              return i.keywordLocation;
            })}
        </div>
      </div>
    </div>
  );
}

function FailedTestCasesWindow({
  failedTestCases,
  totalTestCases,
}: {
  failedTestCases: FailedTestCase[];
  totalTestCases: number;
}) {
  const [activeTestCase, setActiveTestCase] = useState(0);
  return (
    <div className={styles.failedTestCasesWindow}>
      <div className={styles.failedTestCasesHeaderWrapper}>
        <span className={styles.failedTestCasesHeader}>Invalid Schema!</span>
        <span className={styles.failedTestCasesSubtitle}>
          {failedTestCases.length} out of {totalTestCases} test cases failed
        </span>
      </div>
      <div className={styles.failedTestCasesBody}>
        <div className={styles.failedTestCasesTabs}>
          {failedTestCases.map((_, i) => (
            <TestCaseTab
              key={i}
              isActive={i === activeTestCase}
              index={i}
              setIsActive={setActiveTestCase}
            />
          ))}
        </div>
        <FailedTestCaseItem
          index={activeTestCase}
          testCase={failedTestCases[activeTestCase]}
        />
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
      <FailedTestCasesWindow
        failedTestCases={outputResult.failedTestCases!}
        totalTestCases={outputResult.totalTestCases!}
      />
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
