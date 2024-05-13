import { contentManager } from "@/lib/contentManager";
import { Button } from "@chakra-ui/react";
import Link from "next/link";

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
  //   console.log(
  //     contentManager.getNextStep(params.markdownPath.join("/") + ".mdx"),
  //     "next step"
  //   );

  const nextStepPath = contentManager.getNextStepPath(
    params.markdownPath.join("/") + ".mdx"
  );

  const previousStepPath = contentManager.getPreviousStepPath(
    params.markdownPath.join("/") + ".mdx"
  );

  return (
    <>
      <Page />
      <div>
        {previousStepPath && (
          <Link href={"/" + previousStepPath}>
            <Button variant={"default"} size={"sm"}>
              Previous
            </Button>
          </Link>
        )}
        {nextStepPath && (
          <Link href={"/" + nextStepPath}>
            <Button variant={"default"} size={"sm"}>
              Next
            </Button>
          </Link>
        )}
      </div>
    </>
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
