import React from "react";
import styles from "./InfoBox.module.css";
export default function InfoBox({ children }: { children: React.ReactNode }) {
  return <div className={styles.infoBox}>{children}</div>;
}
