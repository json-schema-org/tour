import { FailedTestCase } from "@/lib/types";
import TestCaseTab from "../TestCaseTab";
import styles from "./FailedTestCaseWindow.module.css";
import { useState } from "react";

function FailedTestCaseItem({
  testCase,
  index,
}: {
  testCase: FailedTestCase;
  index: number;
}) {
  return (
    <div className={styles.failedTestCase}>
      <div className={styles.failedTestCaseResultWrapper}>
        <span className={styles.failedTestCaseResult}>
          <span className={styles.failedTestCaseResultTitle}>Expected:</span>
          <span className={styles.failedTestCaseResultValue}>
            {testCase.expected ? "valid" : "invalid"}
          </span>
        </span>
        <span className={styles.failedTestCaseResult}>
          <span className={styles.failedTestCaseResultTitle}>Actual:</span>
          <span className={styles.failedTestCaseResultValue}>
            {testCase.actual ? "valid" : "invalid"}
          </span>
        </span>
      </div>
      <div className={styles.failedTestCaseCode}>
        {JSON.stringify(testCase.input, null, 2)}
      </div>
      <div className={styles.failedTestCaseError}>
        {testCase.errors && <b>trace: </b>}
        {testCase.errors &&
          testCase.errors.map((i) => {
            return i.keywordLocation;
          })}
      </div>
    </div>
  );
}

export default function FailedTestCasesWindow({
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
  );
}
