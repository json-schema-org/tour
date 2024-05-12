import { CustomMDX } from "@/app/components/mdx";
import { Chapter, ContentOutline } from "./types";
import fs from "fs";
import matter from "gray-matter";
import { Metadata } from "./types";

/* 

 - the content is stored in the content folder
 - this contentManager object will generate a outline of type ContentOutline
 - it will keep track of the active chapter and step
 - return full path of the active step
 - return the next step
 - return the previous step
 - return the next chapter
 - return the previous chapter
 - change the active chapter
 - change the active step
 - parse a mdx file and return component and metadata using gray-matter


The content folder follows this structure:

├── 01-introduction
|   ├── index.mdx
│   ├── 01-welcome.mdx
│   ├── 02-what-is-react.mdx
├── 02-types
│   ├── index.mdx
│   ├── 01-primitive-types.mdx
│   ├── 02-arrays.mdx
├─

*/

export default class ContentManager {
  private contentFolderPath: string = "./content";
  public outline: ContentOutline;
  public activeChapterIndex: number = 0;
  public activeStepIndex: number = 0;
  private indexFileName = "index.mdx";

  constructor() {
    this.outline = this.generateOutline();
  }

  public parseMdxFile(relativeFilePath: string) {
    const file = fs.readFileSync(
      this.contentFolderPath + "/" + relativeFilePath,
      "utf-8"
    );
    const { content, data } = matter(file);
    const Page = () => CustomMDX({ source: content });
    return { Page, metadata: data as Metadata };
  }

  private generateOutline(): ContentOutline {
    const contentOutline: ContentOutline = [];
    const files = fs.readdirSync(this.contentFolderPath, {
      withFileTypes: true,
    });

    files.forEach((file) => {
      if (file.isDirectory()) {
        const { metadata } = this.parseMdxFile(
          `${file.name}/${this.indexFileName}`
        );

        const chapter: Chapter = {
          title: metadata.title,
          folderName: file.name,
          steps: [],
        };
        const chapterPath = `${this.contentFolderPath}/${file.name}`;
        let chapterFiles = fs.readdirSync(chapterPath, {
          withFileTypes: true,
        });
        chapterFiles = chapterFiles.filter(
          (file) => file.name !== this.indexFileName
        );
        chapterFiles.forEach((chapterFile) => {
          const { metadata } = this.parseMdxFile(
            `${file.name}/${chapterFile.name}`
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
    console.log(contentOutline[0].steps);
    return contentOutline;
  }
}
