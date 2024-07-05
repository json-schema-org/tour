import fs from "fs";
import { contentManager } from "@/lib/contentManager";
import { Chapter, ContentOutline, Metadata } from "@/lib/types";
import matter from "gray-matter";

function parseMdxMetadata(fullFilePath: string) {
  const file = fs.readFileSync(fullFilePath, "utf-8");

  const { content, data } = matter(file);

  return { metadata: data as Metadata };
}

function generateOutline(): ContentOutline {
  const contentOutline: ContentOutline = [];
  const files = fs.readdirSync(contentManager.contentFolderPath, {
    withFileTypes: true,
  });

  files.forEach((file, chapterNumber) => {
    if (file.isDirectory()) {
      const { metadata } = parseMdxMetadata(
        `${contentManager.contentFolderName}/${file.name}/${contentManager.indexFileName}`
      );

      const chapter: Chapter = {
        title: metadata.title,
        folderName: file.name,
        steps: [],
      };
      const chapterPath = `${contentManager.contentFolderPath}/${file.name}`;
      let chapterFiles = fs.readdirSync(chapterPath, {
        withFileTypes: true,
      });
      chapterFiles = chapterFiles.filter(
        (file) => file.name !== contentManager.indexFileName
      );
      chapterFiles.forEach((chapterFile, stepNumber) => {
        const { metadata } = parseMdxMetadata(
          `${contentManager.contentFolderName}/${file.name}/${chapterFile.name}/${contentManager.instructionsFileName}`
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
