import React from "react";
import styles from "./KeyBindings.module.css";

function KeyBindings({
  keys,
  beforeText,
  afterText,
}: {
  keys: string[];
  beforeText?: string;
  afterText?: string;
}) {
  return (
    <div className={styles.keysWrapper}>
      {beforeText && <span>{beforeText}</span>}
      {keys.map((key, index) => (
        <span key={index} className={styles.keyAndPlus}>
          <span className={styles.key}>{key}</span>
          {index !== keys.length - 1 && <span className={styles.plus}>+</span>}
        </span>
      ))}
      {afterText && <span>{afterText}</span>}
    </div>
  );
}

export default KeyBindings;
