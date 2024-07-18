import React from "react";
import styles from "./GoodToKnowBox.module.css";

export default function GoodToKnowBox({
  title,
  children,
}: {
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={styles.goodToKnowBox}>
      <div className={styles.goodToKnowBoxTitle}>
        {title ? title : "Good to Know"}
      </div>
      <div className={styles.goodToKnowBoxContent}>{children}</div>
    </div>
  );
}
