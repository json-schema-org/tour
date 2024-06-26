import React from "react";
import styles from "./page.module.css";
import NavBar from "../components/NavBar";
import { contentManager } from "@/lib/contentManager";

export default function PageLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { markdownPath: string[] };
}) {
  const urlPath = params.markdownPath.join("/");

  const {
    chapterIndex,
    chapterTitle,
    mdPath,
    previousStepPath,
    stepIndex,
    totalSteps,
    codeFile,
    stepTitle,
  } = contentManager.getPageMeta(urlPath);
  return (
    <div className={styles.wrapper}>
      <NavBar
        chapterTitle={chapterTitle}
        lessonTitle={stepTitle}
        backLink={previousStepPath}
        chapterIndex={chapterIndex}
        stepIndex={stepIndex}
      />
      {children}
    </div>
  );
}
