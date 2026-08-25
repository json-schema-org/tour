"use client";

import React, { useState } from "react";
import styles from "./ResponsiveTourWorkspace.module.css";
import ContentViewer from "../ContentViewer";
import EditorNOutput from "../EditorNOutput";
import { CodeFile } from "@/lib/types";
import cx from "classnames";

export type WorkspaceTab = "lesson" | "editor";

export default function ResponsiveTourWorkspace({
  pageContent,
  codeFile,
  nextStepPath,
  stepIndex,
  chapterIndex,
}: {
  pageContent: React.ReactNode;
  codeFile: CodeFile;
  nextStepPath: string | undefined;
  stepIndex: number;
  chapterIndex: number;
}) {
  const [activeTab, setActiveTab] = useState<WorkspaceTab>("lesson");

  return (
    <div className={styles.workspaceContainer}>
      <div className={styles.tabBar}>
        <button
          className={cx(styles.tabButton, {
            [styles.tabButtonActive]: activeTab === "lesson",
          })}
          onClick={() => setActiveTab("lesson")}
        >
          <span>📖 Lesson</span>
        </button>
        <button
          className={cx(styles.tabButton, {
            [styles.tabButtonActive]: activeTab === "editor",
          })}
          onClick={() => setActiveTab("editor")}
        >
          <span>💻 Code & Output</span>
        </button>
      </div>

      <div className={styles.mainArea}>
        <div
          className={cx({
            [styles.activeOnSmall]: activeTab === "lesson",
            [styles.hiddenOnSmall]: activeTab !== "lesson",
          })}
          style={{ height: "100%", width: "100%" }}
        >
          <ContentViewer>{pageContent}</ContentViewer>
        </div>

        <div
          className={cx({
            [styles.activeOnSmall]: activeTab === "editor",
            [styles.hiddenOnSmall]: activeTab !== "editor",
          })}
          style={{ height: "100%", width: "100%" }}
        >
          <EditorNOutput
            codeFile={codeFile}
            nextStepPath={nextStepPath}
            stepIndex={stepIndex}
            chapterIndex={chapterIndex}
          />
        </div>
      </div>
    </div>
  );
}
