import { CustomMDX } from "@/app/components/mdx";
import { Chapter, ContentOutline } from "./types";
import fs from "fs";
import matter from "gray-matter";
import { Metadata } from "./types";
import next from "next";

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
  public contentFolderName: string = this.contentFolderPath.replace("./", "");
  public outline: ContentOutline;

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

    files.forEach((file, chapterNumber) => {
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
        chapterFiles.forEach((chapterFile, stepNumber) => {
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

    return contentOutline;
  }

  public getNextStep(activeStepPath: string): string {
    const [chapterIndex, stepIndex] =
      this.getChapterAndStepIndex(activeStepPath);
    const nextStep =
      this.outline[chapterIndex].steps[stepIndex].nextStepFullPath;
    return nextStep as string;
  }

  public getChapterAndStepIndex(activeStepPath: string): [number, number] {
    const [chapterIndex, stepIndex] = activeStepPath.split("/").map((index) => {
      console.log(index, "index");
      return parseInt(index.slice(0, 3), 10) - 1;
    });
    console.log(chapterIndex, stepIndex);
    return [chapterIndex, stepIndex];
  }

  public getStepPath(chapterIndex: number, stepIndex: number): string {
    return `${this.outline[chapterIndex].steps[stepIndex].fullPath}`;
  }

  public async dynamicImport() {}
}

const contentManager = new ContentManager();
export { contentManager };
