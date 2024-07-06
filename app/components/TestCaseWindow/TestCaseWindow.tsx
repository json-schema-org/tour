import { TestCaseResult } from "@/lib/types";
import TestCaseTab from "../TestCaseTab";
import styles from "./TestCaseWindow.module.css";
import { useEffect, useMemo, useRef, useState } from "react";
import { Box, Flex, useColorMode } from "@chakra-ui/react";
import CkChevronLeft from "@/app/styles/icons/CkChevronLeft";
import CkChevronRight from "@/app/styles/icons/CkChevronRight";
import cx from "classnames";

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
          <span
            className={cx(styles.TestCaseResultValue)}
            style={{
              color: testCase.expected ? "#00B83F" : "red",
            }}
          >
            {testCase.expected ? "valid" : "invalid"}
          </span>
        </span>
        <span className={styles.TestCaseResult}>
          <span className={styles.TestCaseResultTitle}>Actual:</span>
          <span
            className={styles.TestCaseResultValue}
            style={{
              color: testCase.actual ? "#00B83F" : "red",
            }}
          >
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
  const testCasesTabWrapperRef = useRef<HTMLDivElement | null>(null);
  const { colorMode } = useColorMode();
  const scrollLeft = () => {
    testCasesTabWrapperRef.current!.scrollLeft -= 100;
  };
  const scrollRight = () => {
    testCasesTabWrapperRef.current!.scrollLeft += 100;
  };
  const numberOfFailedTestCases = useMemo(
    () => testCaseResult.filter((testCase) => !testCase.passed).length,
    [testCaseResult]
  );

  return (
    <div className={styles.TestCasesWindow}>
      <div className={styles.TestCasesHeaderWrapper}>
        <span className={styles.TestCasesHeader}>Invalid Schema!</span>
        <span className={styles.TestCasesSubtitle}>
          {numberOfFailedTestCases} out of {totalTestCases} test cases failed
        </span>
      </div>
      <Flex dir="row" gap={2}>
        <button onClick={scrollLeft} className={styles.scrollButton}>
          <CkChevronLeft colorMode={colorMode} />
        </button>

        <div
          className={styles.TestCasesTabsWrapper}
          ref={testCasesTabWrapperRef}
        >
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

        <button onClick={scrollRight} className={styles.scrollButton}>
          <CkChevronRight colorMode={colorMode} />
        </button>
      </Flex>

      <TestCaseItem
        index={activeTestCase}
        testCase={testCaseResult[activeTestCase]}
      />
    </div>
  );
}
