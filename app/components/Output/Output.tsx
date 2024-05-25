import React from "react";
import styles from "./Output.module.css";

export default function Output({ output }: { output: string }) {
  return <div className={styles.output}>{output}</div>;
}
