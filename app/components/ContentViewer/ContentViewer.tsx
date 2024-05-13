import React from "react";
import styles from "./ContentViewer.module.css";

export default function ContentViewer({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className={styles.contentWrapper}>{children}</div>;
}
