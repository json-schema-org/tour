import { contentManager } from "@/lib/contentManager";
import React from "react";

export default function Content({ params }: { params: { path: string[] } }) {
  const { Page } = contentManager.parseMdxFile(params.path.join("/") + ".mdx");
  return <Page />;
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
  console.log(pathList);
  return pathList;
}
