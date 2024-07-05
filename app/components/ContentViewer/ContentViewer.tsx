"use client";

import styles from "./ContentViewer.module.css";
import Progressbar from "../Progressbar";
import { useEffect, useState } from "react";
import { contentManager } from "@/lib/contentManager";

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
