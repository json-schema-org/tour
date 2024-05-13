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
  public contentFolderName: string = this.contentFolderPath.replace("./", "");

  public outlineJSONPath: string = "./content/outline.json";

  private indexFileName = "index.mdx";

  public getOutline() {
    // check if outline.json exists
    if (!fs.existsSync(this.outlineJSONPath)) {
      throw new Error(
        "Outline file does not exist. Run generateOutline script to generate outline.json"
      );
    }
    const outline = JSON.parse(
      fs.readFileSync(this.outlineJSONPath, "utf-8")
    ) as ContentOutline;

    return outline;
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

  public generateOutline(): ContentOutline {
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
  public getStepLocation(fullPath: string) {
    const outline = this.getOutline();
    let chapterIndex = 0;
    let stepIndex = 0;
    outline.forEach((chapter, index) => {
      const step = chapter.steps.find((step) => step.fullPath === fullPath);
      if (step) {
        chapterIndex = index;
        stepIndex = chapter.steps.indexOf(step);
      }
    });
    return { chapterIndex, stepIndex };
  }

  private removeMdxExtension(fileName: string) {
    return fileName.replace(".mdx", "");
  }

  public getNextStepPath(activeStepPath: string) {
    const outline = this.getOutline();
    const { chapterIndex, stepIndex } = this.getStepLocation(activeStepPath);
    const chapter = outline[chapterIndex];
    const nextStep = chapter.steps[stepIndex + 1];
    if (nextStep) {
      return this.removeMdxExtension(nextStep.fullPath);
    }
    const nextChapter = outline[chapterIndex + 1];
    if (nextChapter) {
      return this.removeMdxExtension(nextChapter.steps[0].fullPath);
    }
  }

  public getPreviousStepPath(activeStepPath: string) {
    const outline = this.getOutline();
    const { chapterIndex, stepIndex } = this.getStepLocation(activeStepPath);
    const chapter = outline[chapterIndex];
    const previousStep = chapter.steps[stepIndex - 1];
    if (previousStep) {
      return this.removeMdxExtension(previousStep.fullPath);
    }
    const previousChapter = outline[chapterIndex - 1];
    if (previousChapter) {
      return this.removeMdxExtension(
        previousChapter.steps[previousChapter.steps.length - 1].fullPath
      );
    }
  }
  public getTotalChapters() {
    return this.getOutline().length;
  }
  public getTotalSteps(chapterIndex: number) {
    return this.getOutline()[chapterIndex].steps.length;
  }
}

const contentManager = new ContentManager();
export { contentManager };
