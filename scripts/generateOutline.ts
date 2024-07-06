import fs from "fs";

import { Chapter, ContentOutline, Metadata } from "@/lib/types";
import matter from "gray-matter";
import {
  contentFolderName,
  contentFolderPath,
  indexFileName,
  instructionsFileName,
} from "@/lib/contentVariables";

function parseMdxMetadata(fullFilePath: string) {
  const file = fs.readFileSync(fullFilePath, "utf-8");

  const { content, data } = matter(file);

  return { metadata: data as Metadata };
}

function generateOutline(): ContentOutline {
  const contentOutline: ContentOutline = [];
  const files = fs.readdirSync(contentFolderPath, {
    withFileTypes: true,
  });

  files.forEach((file, chapterNumber) => {
    if (file.isDirectory()) {
      const { metadata } = parseMdxMetadata(
        `${contentFolderName}/${file.name}/${indexFileName}`
      );

      const chapter: Chapter = {
        title: metadata.title,
        folderName: file.name,
        steps: [],
      };
      const chapterPath = `${contentFolderPath}/${file.name}`;
      let chapterFiles = fs.readdirSync(chapterPath, {
        withFileTypes: true,
      });
      chapterFiles = chapterFiles.filter((file) => file.name !== indexFileName);
      chapterFiles.forEach((chapterFile, stepNumber) => {
        const { metadata } = parseMdxMetadata(
          `${contentFolderName}/${file.name}/${chapterFile.name}/${instructionsFileName}`
        );

        const step = {
          title: metadata.title,
          fileName: chapterFile.name,
          fullPath: `${file.name}/${chapterFile.name}`,
        };
        chapter.steps.push(step);
      });
      contentOutline.push(chapter);
    }
  });

  return contentOutline;
}
const outline = generateOutline();
const outlineString = JSON.stringify(outline, null, 2);

fs.writeFileSync("./content/outline.json", outlineString);
