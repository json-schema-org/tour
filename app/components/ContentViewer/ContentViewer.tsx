"use client";

import styles from "./ContentViewer.module.css";
import Progressbar from "../Progressbar";
import { useEffect, useState } from "react";
import { contentManager } from "@/lib/contentManager";

export default function ContentViewer({
  urlPath,
  children,
}: {
  urlPath: string;

  children: React.ReactNode;
}) {
  const { stepIndex, totalSteps } = contentManager.getPageMeta(urlPath);
  const [progress, setProgress] = useState(
    ((stepIndex + 1) / totalSteps) * 100
  );
  useEffect(() => {
    setProgress(((stepIndex + 1) / totalSteps) * 100);
  }, [urlPath]);

  return (
    <div className={styles.contentWrapper}>
      <Progressbar progress={progress} />
      <div className={styles.content}>{children}</div>
    </div>
  );
}
