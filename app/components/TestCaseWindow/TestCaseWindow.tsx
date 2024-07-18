import { TestCaseResult } from "@/lib/types";
import TestCaseTab from "../TestCaseTab";
import styles from "./TestCaseWindow.module.css";
import { useEffect, useMemo, useRef, useState } from "react";
import { Box, Flex, useColorMode } from "@chakra-ui/react";
import CkChevronLeft from "@/app/styles/icons/CkChevronLeft";
import CkChevronRight from "@/app/styles/icons/CkChevronRight";
import cx from "classnames";
import CodeSnippet from "../CodeSnippet/CodeSnippet";

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
        <CodeSnippet>{JSON.stringify(testCase.input, null, 2)}</CodeSnippet>
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
  const [isLeftDisabled, setIsLeftDisabled] = useState(true);
  const [isRightDisabled, setIsRightDisabled] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [areBothDisabled, setAreBothDisabled] = useState(false);
  const handleScroll = () => {
    const container = testCasesTabWrapperRef.current;
    if (container) {
      const newScrollPosition = container.scrollLeft;
      const maxScroll = container.scrollWidth - container.clientWidth;
      console.log(newScrollPosition, maxScroll);

      setScrollPosition(newScrollPosition);
      setIsLeftDisabled(newScrollPosition === 0);
      setIsRightDisabled(Math.round(newScrollPosition + 1) >= maxScroll);
    }
  };

  useEffect(() => {
    const container = testCasesTabWrapperRef.current;
    if (container) {
      const newScrollPosition = container.scrollLeft;
      const maxScroll = container.scrollWidth - container.clientWidth;
      if (newScrollPosition === 0 && maxScroll === 0) {
        setIsLeftDisabled(true);
        setIsRightDisabled(true);
        setAreBothDisabled(true);
      } else {
        container.addEventListener("scroll", handleScroll);
        return () => container.removeEventListener("scroll", handleScroll);
      }
    }
  }, []);

  return (
    <div className={styles.TestCasesWindow}>
      <div className={styles.TestCasesHeaderWrapper}>
        <span className={styles.TestCasesHeader}>Invalid Schema!</span>
        <span className={styles.TestCasesSubtitle}>
          {numberOfFailedTestCases} out of {totalTestCases} test cases failed
        </span>
      </div>
      <Flex dir="row" gap={2}>
        {!areBothDisabled && (
          <button
            onClick={scrollLeft}
            className={cx(
              styles.scrollButton,
              isLeftDisabled ? styles.disabledScrollBtn : ""
            )}
          >
            <CkChevronLeft colorMode={colorMode} />
          </button>
        )}
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
        {!areBothDisabled && (
          <button
            onClick={scrollRight}
            className={cx(
              styles.scrollButton,
              isRightDisabled ? styles.disabledScrollBtn : ""
            )}
          >
            <CkChevronRight colorMode={colorMode} />
          </button>
        )}
      </Flex>

      <TestCaseItem
        index={activeTestCase}
        testCase={testCaseResult[activeTestCase]}
      />
    </div>
  );
}
