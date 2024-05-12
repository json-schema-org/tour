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

          let nextChapterIndex = 0;
          let previousChapterIndex = 0;
          let previousStepIndex = 0;

          const maxSteps = chapterFiles.length;
          const maxChapters = files.length;

          // Calculate the nextStepIndex
          let nextStepIndex = stepNumber + 1;
          if (nextStepIndex >= maxSteps) {
            // If the next step index exceeds the maximum steps in the current chapter,
            // move to the next chapter if possible
            let nextChapterIndex = chapterNumber + 1;
            if (nextChapterIndex < maxChapters) {
              nextStepIndex = 0; // Set the next step index to the first step of the next chapter
            } else {
              nextChapterIndex = chapterNumber; // Stay in the current chapter if it's the last chapter
              nextStepIndex = stepNumber; // Stay at the current step
            }
          }

          // Calculate the previousStepIndex
          previousStepIndex = stepNumber - 1;
          if (previousStepIndex < 0) {
            // If the previous step index is less than 0,
            // move to the previous chapter if possible
            let previousChapterIndex = chapterNumber - 1;
            if (previousChapterIndex >= 0) {
              // Calculate the maximum number of steps for the previous chapter
              const maxPreviousSteps =
                fs.readdirSync(
                  this.contentFolderName +
                    "/" +
                    files[previousChapterIndex].name
                ).length - 1;
              previousStepIndex = maxPreviousSteps - 1; // Set the previous step index to the last step of the previous chapter
            } else {
              previousChapterIndex = chapterNumber; // Stay in the current chapter if it's the first chapter
              previousStepIndex = stepNumber; // Stay at the current step
            }
          }

          const nextStepFileName = fs.readdirSync(
            this.contentFolderName + "/" + files[nextChapterIndex].name
          )[nextStepIndex];

          const step = {
            title: metadata.title,
            fileName: chapterFile.name,
            fullPath: `${file.name}/${chapterFile.name}`,
            nextStepFullPath: `${files[nextChapterIndex].name}/${0}`,
            // previousStepFullPath: `${files[previousChapterIndex].name}/${chapterFiles[previousStepIndex].name}`,
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
