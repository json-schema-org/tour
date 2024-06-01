import classnames from "classnames";
import React from "react";
import styles from "./TestCaseTab.module.css";
export default function TestCaseTab({
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
