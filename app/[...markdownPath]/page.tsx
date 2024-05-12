import { contentManager } from "@/lib/contentManager";

import React from "react";

export default async function Content({
  params,
}: {
  params: { markdownPath: string[] };
}) {
  const { Page, metadata } = contentManager.parseMdxFile(
    params.markdownPath.join("/") + ".mdx"
  );

  // const folderName = contentManager.contentFolderName;
  // const file = await import(
  //   `./../../../${folderName}/${params.path.join("/")}.mdx`
  // );
  // console.log(file.data);
  console.log(
    contentManager.getNextStep(params.markdownPath.join("/") + ".mdx"),
    "next step"
  );

  return (
    <>
      <Page />
    </>
  );
}
export async function generateStaticParams() {
  const outline = contentManager.outline;
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
