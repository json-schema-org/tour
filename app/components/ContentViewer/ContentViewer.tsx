"use client";

import styles from "./ContentViewer.module.css";
import Progressbar from "../Progressbar";

export default function ContentViewer({
  children,
  totalSteps,
  stepIndex,
}: {
  children: React.ReactNode;
  totalSteps: number;
  stepIndex: number;
}) {
  const progress = ((stepIndex + 1) / totalSteps) * 100;

  return (
    <div className={styles.contentWrapper}>
      <Progressbar progress={progress} />
      <div className={styles.content}>{children}</div>
    </div>
  );
}
