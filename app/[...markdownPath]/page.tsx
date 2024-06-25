import { contentManager } from "@/lib/contentManager";
import styles from "./page.module.css";

import React, { Suspense } from "react";
import NavigationBtn from "../components/NavigationBtn";
import { Box, Button, Flex } from "@chakra-ui/react";
import Link from "next/link";
import ContentViewer from "../components/ContentViewer/ContentViewer";
import CodeEditor from "../components/CodeEditor/CodeEditor";
import { parseMdxFile } from "@/lib/server-functions";
import Output from "../components/Output/Output";
import EditorNOutput from "../components/EditorNOutput/EditorNOutput";
import { title } from "process";
import ThemeSwitch from "../components/ThemeSwitch/ThemeSwitch";
import NavBar from "../components/NavBar/NavBar";

export function generateMetadata({
  params,
}: {
  params: { markdownPath: string[] };
}) {
  const urlPath = params.markdownPath.join("/");
  const { mdPath, chapterTitle } = contentManager.getPageMeta(urlPath);
  const { metadata } = parseMdxFile(mdPath);

  return {
    title: `${metadata.title}: ${chapterTitle} | A Tour of JSON Schema`,
    description: metadata.description,
    keywords: metadata.keywords,
  };
}

export default async function Content({
  params,
}: {
  params: { markdownPath: string[] };
}) {
  const urlPath = params.markdownPath.join("/");

  const {
    chapterIndex,
    chapterTitle,
    mdPath,
    nextStepPath,
    previousStepPath,
    stepIndex,
    totalChapters,
    totalSteps,
    codeFile,
  } = contentManager.getPageMeta(urlPath);
  const { Page, metadata } = parseMdxFile(mdPath);

  return (
    <div className={styles.wrapper}>
      <NavBar />
      <div className={styles.mainArea}>
        {/* <ContentViewer>
          <Page />
        </ContentViewer>
        <EditorNOutput codeFile={codeFile} /> */}
      </div>
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
