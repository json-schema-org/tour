import { describe, it, expect, beforeEach } from "vitest";
import ContentManager from "@/lib/contentManager";
import {
  contentFolderName,
  instructionsFileName,
  contentFolderPath,
  indexFileName,
} from "@/lib/contentVariables";
import { ContentOutline } from "@/lib/types";
describe("ContentManager", () => {
  let contentManager: ContentManager;
  let firstLessonPath: string;
  let lastLessonPath: string;
  let outline: ContentOutline;

  beforeEach(() => {
    contentManager = new ContentManager();
    outline = contentManager.getOutline();
    firstLessonPath = outline[0].steps[0].fullPath;
    lastLessonPath = outline.slice(-1)[0].steps.slice(-1)[0].fullPath;
  });
  it("should have necessary variables defined", () => {
    expect(contentFolderName).toBeDefined();
    expect(instructionsFileName).toBeDefined();
    expect(contentFolderPath).toBeDefined();
    expect(indexFileName).toBeDefined();

    expect(contentManager.codeFileName).toBeDefined();
    expect(contentManager.pathPrefix).toBeDefined();
    expect(contentManager.outlineJSONPath).toBeDefined();
  });

  it("should get the outline", () => {
    const outline = contentManager.getOutline();
    expect(outline).toBeDefined();
    expect(Array.isArray(outline)).toBe(true);
  });

  it("should get the step location", () => {
    const { chapterIndex, stepIndex } =
      contentManager.getStepLocation(firstLessonPath);
    expect(chapterIndex).toBe(0);
    expect(stepIndex).toBe(0);
  });

  it("should get path with prefix", () => {
    const prefixedPath = contentManager.getPathWithPrefix(firstLessonPath);
    expect(prefixedPath).toBe(`${contentFolderName}/${firstLessonPath}`);
  });

  it("should get the next step path", () => {
    const nextStepPath = contentManager.getNextStepPath(firstLessonPath);
    expect(nextStepPath).toBeDefined();
    const nextStepLocation = contentManager.getStepLocation(nextStepPath!);
    expect(nextStepLocation.chapterIndex).toBe(0);
    expect(nextStepLocation.stepIndex).toBe(1);
  });

  it("should get the previous step path", () => {
    const nextStepPath = contentManager.getNextStepPath(firstLessonPath);
    const previousStepPath = contentManager.getPreviousStepPath(nextStepPath!);
    expect(previousStepPath).toBe(firstLessonPath);
  });

  it("should get the total chapters", () => {
    const totalChapters = contentManager.getTotalChapters();
    expect(totalChapters).toBeGreaterThan(0);
  });

  it("should get the total steps in a chapter", () => {
    const chapterIndex = 0;
    const totalSteps = contentManager.getTotalSteps(chapterIndex);
    expect(totalSteps).toBeGreaterThan(0);
  });

  it("should get the instructions file path", () => {
    const urlPath = "chapter1/step1";
    const instructionsFilePath =
      contentManager.getInstructionsFilePath(urlPath);
    expect(instructionsFilePath).toBe(
      `content/chapter1/step1/${instructionsFileName}`
    );
  });

  it("should get the code file path", () => {
    const urlPath = "chapter1/step1";
    const codeFilePath = contentManager.getCodeFilePath(urlPath);
    expect(codeFilePath).toBe(
      `content/chapter1/step1/${contentManager.codeFileName}`
    );
  });

  it("should get page metadata", () => {
    const urlPath = "chapter1/step1";
    const pageMeta = contentManager.getPageMeta(urlPath);
    expect(pageMeta).toBeDefined();
    expect(pageMeta).toHaveProperty("nextStepPath");
    expect(pageMeta).toHaveProperty("previousStepPath");
    expect(pageMeta).toHaveProperty("chapterIndex");
    expect(pageMeta).toHaveProperty("stepIndex");
    expect(pageMeta).toHaveProperty("totalChapters");
    expect(pageMeta).toHaveProperty("totalSteps");
    expect(pageMeta).toHaveProperty("mdPath");
    expect(pageMeta).toHaveProperty("chapterTitle");
    expect(pageMeta).toHaveProperty("codePath");
    expect(pageMeta).toHaveProperty("stepTitle");
  });
});
