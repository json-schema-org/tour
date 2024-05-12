import { contentManager } from "@/lib/contentManager";

import React from "react";

export default async function Content({
  params,
}: {
  params: { path: string[] };
}) {
  const { Page, metadata } = contentManager.parseMdxFile(
    params.path.join("/") + ".mdx"
  );

  // const folderName = contentManager.contentFolderName;
  // const file = await import(
  //   `./../../../${folderName}/${params.path.join("/")}.mdx`
  // );
  // console.log(file.data);
  console.log(
    contentManager.getNextStep(params.path.join("/") + ".mdx"),
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
  const pathList: { path: string[] }[] = [];

  outline.map((item) => {
    item.steps.map((step) => {
      pathList.push({
        path: [item.folderName, step.fileName.replaceAll(".mdx", "")],
      });
    });
  });
  return pathList;
}
