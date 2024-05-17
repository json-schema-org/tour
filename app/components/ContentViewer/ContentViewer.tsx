"use client";

import React from "react";
import styles from "./ContentViewer.module.css";
import { useTheme } from "@chakra-ui/react";

export default function ContentViewer({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.contentWrapper}>
      <div className={styles.content}>{children}</div>
    </div>
  );
}
