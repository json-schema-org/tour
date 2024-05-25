import React from "react";
import styles from "./Output.module.css";
import classnames from "classnames";

function Output({
  children,
  isValid,
  flex,
}: {
  children: React.ReactNode;
  isValid: boolean;
  flex?: number;
}) {
  let textColor;
  let isChildrenEmpty = children?.toString().trim() === "";

  if (isChildrenEmpty) {
    textColor = "neutral";
  } else {
    textColor = isValid ? "valid" : "invalid";
  }
  return (
    <div
      className={classnames(styles.output, styles[textColor])}
      style={{ flex: flex }}
    >
      <div className={styles.header}>
        <div className={styles.title}>Output </div>
      </div>
      <div className={classnames(styles.outputBody)}>
        <pre>{children?.toString()}</pre>
      </div>
    </div>
  );
}

export default Output;
