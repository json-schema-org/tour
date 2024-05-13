import { contentManager } from "@/lib/contentManager";
import styles from "./page.module.css";

import React from "react";
import NavigationBtn from "../components/NavigationBtn/NavigationBtn";
import { Button } from "@chakra-ui/react";
import Link from "next/link";

export default async function Content({
  params,
}: {
  params: { markdownPath: string[] };
}) {
  const mdPath = params.markdownPath.join("/") + ".mdx";
  const { Page, metadata } = contentManager.parseMdxFile(mdPath);

  // const folderName = contentManager.contentFolderName;
  // const file = await import(
  //   `./../../../${folderName}/${params.path.join("/")}.mdx`
  // );
  // console.log(file.data);
  //   console.log(
  //     contentManager.getNextStep(params.markdownPath.join("/") + ".mdx"),
  //     "next step"
  //   );

  const nextStepPath = contentManager.getNextStepPath(mdPath);

  const previousStepPath = contentManager.getPreviousStepPath(mdPath);
  const outline = contentManager.generateOutline();

  const { chapterIndex, stepIndex } = contentManager.getStepLocation(mdPath);
  const chapterTitle = outline[chapterIndex].title;

  return (
    <div className={styles.wrapper}>
      <Link href="/outline">
        <Button size={"sm"} variant={"default"}>
          Back TO OUTLINE
        </Button>
      </Link>
      <div>
        <span>
          Chapter {chapterIndex + 1}: {chapterTitle}
        </span>
      </div>
      <div>
        <span>
          Step {stepIndex + 1}: {metadata.title}
        </span>
      </div>
      <Page />
      <div className={styles.navigationBtnWrapper}>
        <NavigationBtn path={previousStepPath} direction="prev" />
        <NavigationBtn path={nextStepPath} direction="next" />
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
        markdownPath: [item.folderName, step.fileName.replaceAll(".mdx", "")],
      });
    });
  });
  return pathList;
}
