import { contentManager } from "@/lib/contentManager";
import React from "react";
import { parseLessonFolder } from "@/lib/server-functions";
import ResizableContent from "@/app/components/ResizableContent";

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

  const pageContent = <Page />;

  return (
    <ResizableContent
      content={pageContent}
      codeFile={codeFile}
      nextStepPath={nextStepPath}
      stepIndex={stepIndex}
      chapterIndex={chapterIndex}
    />
  );
}

export async function generateStaticParams() {
  const outline = contentManager.getOutline();
  const pathList: { markdownPath: string[] }[] = [];

  outline.map((item) => {
    item.steps.map((step) => {
      const pathSegments = step.fullPath.split("/");
      pathList.push({
        markdownPath: pathSegments,
      });
    });
  });

  return pathList;
}
