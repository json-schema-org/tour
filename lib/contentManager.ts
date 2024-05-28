import { Chapter, CodeFileExports, ContentOutline } from "./types";
import fs from "fs";
import matter from "gray-matter";
import { Metadata } from "./types";
import typescript from "typescript";

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
  private contentFolderPath: string = "./content";
  public contentFolderName: string = this.contentFolderPath.replace("./", "");

  public outlineJSONPath: string = "./content/outline.json";

  private indexFileName = "index.mdx";
  public instructionsFileName = "instructions.mdx";
  public codeFileName = "code.ts";

  public getOutline() {
    // check if outline.json exists
    if (!fs.existsSync(this.outlineJSONPath)) {
      throw new Error(
        "outline.json file does not exist. Run generateOutline script to generate outline.json"
      );
    }
    const outline = JSON.parse(
      fs.readFileSync(this.outlineJSONPath, "utf-8")
    ) as ContentOutline;

    return outline;
  }

  public parseMdxMetadata(fullFilePath: string) {
    const file = fs.readFileSync(fullFilePath, "utf-8");

    const { content, data } = matter(file);

    return { metadata: data as Metadata };
  }

  public generateOutline(): ContentOutline {
    const contentOutline: ContentOutline = [];
    const files = fs.readdirSync(this.contentFolderPath, {
      withFileTypes: true,
    });

    files.forEach((file, chapterNumber) => {
      if (file.isDirectory()) {
        const { metadata } = this.parseMdxMetadata(
          `${this.contentFolderName}/${file.name}/${this.indexFileName}`
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
          const { metadata } = this.parseMdxMetadata(
            `${this.contentFolderName}/${file.name}/${chapterFile.name}/${this.instructionsFileName}`
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
    return `${this.contentFolderName}/${urlPath}/${this.instructionsFileName}`;
  }
  public getCodeFilePath(urlPath: string) {
    return `${this.contentFolderName}/${urlPath}/${this.codeFileName}`;
  }
  private transpileTypeScriptToJavaScript(tsCode: string) {
    const result = typescript.transpileModule(tsCode, {
      compilerOptions: { module: typescript.ModuleKind.CommonJS },
    });
    return result.outputText;
  }
  public getCodeFileExports(urlPath: string) {
    const path = this.getCodeFilePath(urlPath);
    const fileContent = fs.readFileSync(path, "utf-8");
    const dynmicFunction = new Function(
      "module",
      this.transpileTypeScriptToJavaScript(fileContent)
    );
    const moduleExports: {} | CodeFileExports = {};
    dynmicFunction(moduleExports);

    return (moduleExports as CodeFileExports).exports;
  }
  public getPageMeta(urlPath: string) {
    const nextStepPath = this.getNextStepPath(urlPath);

    const previousStepPath = this.getPreviousStepPath(urlPath);
    const outline = this.getOutline();

    const { chapterIndex, stepIndex } = this.getStepLocation(urlPath);
    const totalChapters = this.getTotalChapters();
    const totalSteps = this.getTotalSteps(chapterIndex);
    const mdPath = this.getInstructionsFilePath(urlPath);
    const chapterTitle = outline[chapterIndex].title;
    const codeFile = this.getCodeFileExports(urlPath);

    return {
      nextStepPath,
      previousStepPath,
      chapterIndex,
      stepIndex,
      totalChapters,
      totalSteps,
      mdPath,
      chapterTitle,
      codeFile,
    };
  }
}

const contentManager = new ContentManager();
export { contentManager };
