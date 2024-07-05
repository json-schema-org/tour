import { TestCaseResult } from "@/lib/types";
import TestCaseTab from "../TestCaseTab";
import styles from "./TestCaseWindow.module.css";
import { useState } from "react";

function TestCaseItem({
  testCase,
  index,
}: {
  testCase: TestCaseResult;
  index: number;
}) {
  return (
    <div className={styles.TestCase}>
      <div className={styles.TestCaseResultWrapper}>
        <span className={styles.TestCaseResult}>
          <span className={styles.TestCaseResultTitle}>Expected:</span>
          <span className={styles.TestCaseResultValue}>
            {testCase.expected ? "valid" : "invalid"}
          </span>
        </span>
        <span className={styles.TestCaseResult}>
          <span className={styles.TestCaseResultTitle}>Actual:</span>
          <span className={styles.TestCaseResultValue}>
            {testCase.actual ? "valid" : "invalid"}
          </span>
        </span>
      </div>
      <div className={styles.TestCaseResultTitle}>Data</div>
      <div className={styles.TestCaseCode}>
        {JSON.stringify(testCase.input, null, 2)}
      </div>
      <div className={styles.TestCaseError}>
        {testCase.errors && <b>trace: </b>}
        {testCase.errors && testCase.errors}
      </div>
    </div>
  );
}

export default function TestCasesWindow({
  testCaseResult,
  totalTestCases,
}: {
  testCaseResult: TestCaseResult[];
  totalTestCases: number;
}) {
  const [activeTestCase, setActiveTestCase] = useState(0);
  return (
    <div className={styles.TestCasesWindow}>
      <div className={styles.TestCasesHeaderWrapper}>
        <span className={styles.TestCasesHeader}>Invalid Schema!</span>
        <span className={styles.TestCasesSubtitle}>
          {testCaseResult.length} out of {totalTestCases} test cases failed
        </span>
      </div>
      <div className={styles.TestCasesTabsWrapper}>
        <div className={styles.TestCasesTabs}>
          {testCaseResult.map((_, i) => (
            <TestCaseTab
              key={i}
              isActive={i === activeTestCase}
              index={i}
              setIsActive={setActiveTestCase}
              passed={testCaseResult[i].passed}
            />
          ))}
        </div>
      </div>

      <TestCaseItem
        index={activeTestCase}
        testCase={testCaseResult[activeTestCase]}
      />
    </div>
  );
}
