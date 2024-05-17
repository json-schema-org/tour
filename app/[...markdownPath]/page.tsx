import { contentManager } from "@/lib/contentManager";
import styles from "./page.module.css";

import React, { Suspense } from "react";
import NavigationBtn from "../components/NavigationBtn";
import { Button, Flex } from "@chakra-ui/react";
import Link from "next/link";
import ContentViewer from "../components/ContentViewer/ContentViewer";
import CodeEditor from "../components/CodeEditor/CodeEditor";
import { parseMdxFile } from "@/lib/functions";

export default async function Content({
  params,
}: {
  params: { markdownPath: string[] };
}) {
  const urlPath = params.markdownPath.join("/");
  const mdPath = contentManager.getInstructionsFilePath(urlPath);

  const { Page, metadata } = parseMdxFile(mdPath);
  const nextStepPath = contentManager.getNextStepPath(urlPath);

  const previousStepPath = contentManager.getPreviousStepPath(urlPath);
  const outline = contentManager.getOutline();

  const { chapterIndex, stepIndex } = contentManager.getStepLocation(urlPath);
  const totalChapters = contentManager.getTotalChapters();
  const totalSteps = contentManager.getTotalSteps(chapterIndex);

  const chapterTitle = outline[chapterIndex].title;

  return (
    <div className={styles.wrapper}>
      <div className={styles.navBar}>
        <div className={styles.navigationBtnWrapper}>
          <Link href="/outline">
            <Button size={"sm"} variant={"default"}>
              Back TO OUTLINE
            </Button>
          </Link>
          <NavigationBtn path={previousStepPath} direction="prev" />
          <NavigationBtn path={nextStepPath} direction="next" />
        </div>
        <Flex gap={4} height={"100%"}>
          <span>
            Chapter {chapterIndex + 1}: {chapterTitle} (
            {((chapterIndex + 1) / totalChapters) * 100}%)
          </span>

          <span>
            Step {stepIndex + 1}: {metadata.title} (
            {((stepIndex + 1) / totalSteps) * 100} %)
          </span>
        </Flex>
      </div>

      <div className={styles.mainArea}>
        <ContentViewer>
          <Page />
        </ContentViewer>
        <CodeEditor urlPath={urlPath} />
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
