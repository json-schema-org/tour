import classnames from "classnames";
import React from "react";
import styles from "./TestCaseTab.module.css";
export default function TestCaseTab({
  isActive,
  index,
  setIsActive,
  passed,
}: {
  isActive: boolean;
  index: number;
  setIsActive: (index: number) => void;
  passed: Boolean;
}) {
  return (
    <div
      className={classnames(
        styles.testCaseTab,
        isActive && styles.activeTestCaseTab
      )}
      onClick={() => setIsActive(index)}
    >
      <div
        className={classnames(
          styles.dot,
          passed ? styles.passed : styles.failed
        )}
      />
      Case {index + 1}
    </div>
  );
}
