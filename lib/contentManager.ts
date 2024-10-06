import { contentFolderName, instructionsFileName } from "./contentVariables";
import { ContentOutline } from "./types";

import outline from "@/content/outline.json";

/* 

This class has the following responsibilities:
- Read the content folder and generate an outline.json file
- Read the outline.json file and return the outline
- Parse an MDX file and return the content and metadata
- Get the next and previous step path
- Get the total number of chapters and steps
- Get the instructions and code file path


The content folder follows this structure:


├── 01-introduction
│   ├── index.mdx
│   ├── 01-welcome
│       ├── instructions.mdx
│       ├── code.ts
│   ├── 02-what-is-json-schema
│       ├── instructions.mdx
│       ├── code.ts
├── 02-types
│   ├── index.mdx
│   ├── 01-primitive-types
│       ├── instructions.mdx
│       ├── code.ts
│   ├── 02-arrays
│       ├── instructions.mdx
│       ├── code.ts


*/

export default class ContentManager {
  public outlineJSONPath: string = "./content/outline.json";
  public codeFileName = "code.ts";
  public pathPrefix = "content";

  public getOutline() {
    return outline as ContentOutline;
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

  public getPathWithPrefix(fullPath: string | undefined) {
    if (!fullPath) {
      return undefined;
    }

    return `${this.pathPrefix}/${fullPath}`;
  }

  public getNextStepPath(activeStepPath: string) {
    const outline = this.getOutline();
    const { chapterIndex, stepIndex } = this.getStepLocation(activeStepPath);
    const chapter = outline[chapterIndex];
    const nextStep = chapter.steps[stepIndex + 1];
    if (nextStep) {
      return nextStep.fullPath;
    }
    const nextChapter = outline[chapterIndex + 1];
    if (nextChapter) {
      return nextChapter.steps[0].fullPath;
    }
  }

  public getPreviousStepPath(activeStepPath: string) {
    const outline = this.getOutline();
    const { chapterIndex, stepIndex } = this.getStepLocation(activeStepPath);
    const chapter = outline[chapterIndex];
    const previousStep = chapter.steps[stepIndex - 1];
    if (previousStep) {
      return previousStep.fullPath;
    }
    const previousChapter = outline[chapterIndex - 1];
    if (previousChapter) {
      return previousChapter.steps[previousChapter.steps.length - 1].fullPath;
    }
  }
  public getTotalChapters() {
    return this.getOutline().length;
  }
  public getTotalSteps(chapterIndex: number) {
    return this.getOutline()[chapterIndex].steps.length;
  }
  public getInstructionsFilePath(urlPath: string) {
    return `${contentFolderName}/${urlPath}/${instructionsFileName}`;
  }
  public getCodeFilePath(urlPath: string) {
    return `${contentFolderName}/${urlPath}/${this.codeFileName}`;
  }

  public getPageMeta(urlPath: string) {
    const nextStepPath = this.getPathWithPrefix(this.getNextStepPath(urlPath));

    const previousStepPath = this.getPathWithPrefix(
      this.getPreviousStepPath(urlPath),
    );
    const outline = this.getOutline();

    const { chapterIndex, stepIndex } = this.getStepLocation(urlPath);
    const totalChapters = this.getTotalChapters();
    const totalSteps = this.getTotalSteps(chapterIndex);
    const mdPath = this.getInstructionsFilePath(urlPath);
    const codePath = this.getCodeFilePath(urlPath);
    const chapterTitle = outline[chapterIndex].title;
    const stepTitle = outline[chapterIndex].steps[stepIndex].title;

    return {
      nextStepPath,
      previousStepPath,
      chapterIndex,
      stepIndex,
      totalChapters,
      totalSteps,
      mdPath,
      chapterTitle,
      codePath,
      stepTitle,
    };
  }
}

const contentManager = new ContentManager();
export { contentManager };
