import React from "react";
import styles from "./Progressbar.module.css";

export default function Progressbar({ progress }: { progress: number }) {
  return (
    <div className={styles.progressbarWrapper}>
      <div
        className={styles.progressbar}
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
}
