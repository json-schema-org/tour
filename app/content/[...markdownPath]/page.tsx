import { contentManager } from "@/lib/contentManager";
import styles from "./page.module.css";
import React from "react";
import { parseLessonFolder } from "@/lib/server-functions";
import EditorNOutput from "@/app/components/EditorNOutput";
import TabHeader from "@/app/components/TabHeader/TabHeader";
import Tabs from "@/app/components/Tabs/Tabs";

export function generateMetadata({
  params,
}: {
  params: { markdownPath: string[] };
}) {
  const urlPath = params.markdownPath.join("/");
  const { mdPath, chapterTitle, codePath } =
    contentManager.getPageMeta(urlPath);
  const { metadata } = parseLessonFolder(mdPath, codePath);

  return {
    title: `${metadata.title}: ${chapterTitle} | A Tour of JSON Schema`,
    description: metadata.description,
    keywords: metadata.keywords,
    authors: [
      {
        name: "Zeel Rajodiya",
        url: "https://github.com/JeelRajodiya",
      },
    ],
  };
}

export default async function Content({
  params,
}: {
  params: { markdownPath: string[] };
}) {
  const urlPath = params.markdownPath.join("/");
  const { mdPath, nextStepPath, stepIndex, codePath, chapterIndex } =
    contentManager.getPageMeta(urlPath);
  const { Page, metadata, codeFile } = parseLessonFolder(mdPath, codePath);
  return (
    <div className={styles.mainArea}>
      <div className={styles.tabContainer}>
        <Tabs
          Page={<Page />}
          solution={JSON.stringify(codeFile.solution, null, 2)}
        />
      </div>
      <EditorNOutput
        codeFile={codeFile}
        nextStepPath={nextStepPath}
        stepIndex={stepIndex}
        chapterIndex={chapterIndex}
      />
    </div>
  );
}
export async function generateStaticParams() {
  const outline = contentManager.getOutline();
  const pathList: { markdownPath: string[] }[] = [];

  outline.map((item) => {
    item.steps.map((step) => {
      pathList.push({
        markdownPath: [item.folderName, step.fileName],
      });
    });
  });

  return pathList;
}
