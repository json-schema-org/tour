import { TestCaseResult } from "@/lib/types";
import TestCaseTab from "../TestCaseTab";
import styles from "./TestCaseWindow.module.css";
import { useEffect, useMemo, useRef, useState } from "react";
import { Flex, useColorMode } from "@chakra-ui/react";
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
              color: testCase.actual
                ? "hsl(var(--success))"
                : "hsl(var(--error))",
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
  isValidSchema = false,
}: {
  testCaseResult: TestCaseResult[];
  totalTestCases: number;
  isValidSchema?: boolean;
}) {
  const [activeTestCase, setActiveTestCase] = useState(0);
  const testCasesTabWrapperRef = useRef<HTMLDivElement | null>(null);
  const { colorMode } = useColorMode();

  const scrollLeft = () => {
    if (testCasesTabWrapperRef.current) {
      testCasesTabWrapperRef.current.scrollLeft -= 100;
    }
  };

  const scrollRight = () => {
    if (testCasesTabWrapperRef.current) {
      testCasesTabWrapperRef.current.scrollLeft += 100;
    }
  };

  const numberOfFailedTestCases = useMemo(
    () => testCaseResult.filter((testCase) => !testCase.passed).length,
    [testCaseResult],
  );

  const normalizedTestCaseResult = useMemo(() => {
    if (isValidSchema) {
      return testCaseResult.map((tc) => ({
        ...tc,
        expected: true,
        actual: true,
        passed: true,
        errors: undefined,
      }));
    }
    return testCaseResult;
  }, [testCaseResult, isValidSchema]);

  const [isLeftDisabled, setIsLeftDisabled] = useState(true);
  const [isRightDisabled, setIsRightDisabled] = useState(false);
  const [areBothDisabled, setAreBothDisabled] = useState(false);

  const handleScroll = () => {
    const container = testCasesTabWrapperRef.current;
    if (container) {
      const newScrollPosition = container.scrollLeft;
      const maxScroll = container.scrollWidth - container.clientWidth;
      setIsLeftDisabled(newScrollPosition === 0);
      setIsRightDisabled(newScrollPosition >= maxScroll);
    }
  };

  useEffect(() => {
    const container = testCasesTabWrapperRef.current;
    if (container) {
      const maxScroll = container.scrollWidth - container.clientWidth;
      setIsLeftDisabled(container.scrollLeft === 0);
      setIsRightDisabled(maxScroll <= 0);
      setAreBothDisabled(maxScroll <= 0);
      container.addEventListener("scroll", handleScroll);
      return () => container.removeEventListener("scroll", handleScroll);
    }
  }, [normalizedTestCaseResult]);

  if (!normalizedTestCaseResult || normalizedTestCaseResult.length === 0) {
    return <div>No test cases available</div>;
  }

  return (
    <div className={styles.TestCasesWindow}>
      <div className={styles.TestCasesHeaderWrapper}>
        {/* Reverted to original "Invalid Schema!" for invalid case */}
        {!isValidSchema && (
          <span className={styles.TestCasesHeader}>Invalid Schema!</span>
        )}
        <span className={styles.TestCasesSubtitle}>
          {isValidSchema
            ? `All ${totalTestCases} test cases passed`
            : `${numberOfFailedTestCases} out of ${totalTestCases} test cases failed`}
        </span>
      </div>
      <Flex dir="row" gap={2}>
        {!areBothDisabled && (
          <button
            onClick={scrollLeft}
            className={cx(
              styles.scrollButton,
              isLeftDisabled ? styles.disabledScrollBtn : "",
            )}
            disabled={isLeftDisabled}
            aria-label="Scroll left"
          >
            <CkChevronLeft colorMode={colorMode} />
          </button>
        )}
        <div
          className={styles.TestCasesTabsWrapper}
          ref={testCasesTabWrapperRef}
        >
          <div className={styles.TestCasesTabs}>
            {normalizedTestCaseResult.map((_, i) => (
              <TestCaseTab
                key={i}
                isActive={i === activeTestCase}
                index={i}
                setIsActive={setActiveTestCase}
                passed={normalizedTestCaseResult[i].passed}
              />
            ))}
          </div>
        </div>
        {!areBothDisabled && (
          <button
            onClick={scrollRight}
            className={cx(
              styles.scrollButton,
              isRightDisabled ? styles.disabledScrollBtn : "",
            )}
            disabled={isRightDisabled}
            aria-label="Scroll right"
          >
            <CkChevronRight colorMode={colorMode} />
          </button>
        )}
      </Flex>
      <TestCaseItem
        index={activeTestCase}
        testCase={normalizedTestCaseResult[activeTestCase]}
      />
    </div>
  );
}
