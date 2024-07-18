import { expectTypeOf, test, assert, assertType } from "vitest";
import {
  contentFolderName,
  instructionsFileName,
} from "@/lib/contentVariables";
import * as fs from "fs";
import * as path from "path";
import { contentManager } from "@/lib/contentManager";
import { getCodeFileExports, parseLessonFolder } from "@/lib/server-functions";
import { hyperjumpValidate } from "@/lib/validators";

// test the structure of the content folder
// test if each of the code.ts files have valid exports

const metadataSchema = {
  type: "object",
  properties: {
    title: { type: "string" },
    description: { type: "string" },
    keywords: { type: "string" },
  },
  required: ["title", "description", "keywords"],
};

const codeFileSchema = {
  type: "object",
  properties: {
    code: { type: "object" },
    testCases: {
      type: "array",
      items: {
        type: "object",
        properties: {
          input: { type: "object" },
          expected: { type: "boolean" },
        },
        required: ["input", "expected"],
      },
    },
    solution: { type: "object" },
  },
  required: ["code", "testCases", "solution"],
};

const folderNameRegEx = /^[0-9]{2}-[^\s]*$/;

test("content folder structure", async () => {
  const contentFolder = path.join(process.cwd(), contentFolderName);
  const folderFiles = fs.readdirSync(contentFolder);

  if (!folderFiles.includes("outline.json")) {
    assert.fail("Content folder does not contain an outline.json file");
  }

  for (const file of folderFiles) {
    if (file === "outline.json") continue;

    const regExResult = folderNameRegEx.exec(file);
    if (regExResult === null) {
      assert.fail(
        `Folder name ${file} does not match the expected pattern: ${folderNameRegEx.source}`
      );
    }

    const chapterFolderFiles = fs.readdirSync(path.join(contentFolder, file));
    if (!chapterFolderFiles.includes("index.mdx")) {
      assert.fail(`Chapter ${file} does not contain an index.mdx file`);
    }

    for (const chapterFile of chapterFolderFiles) {
      if (chapterFile === "index.mdx") continue;

      if (!folderNameRegEx.exec(chapterFile)) {
        assert.fail(
          `Lesson folder name ${chapterFile} does not match the expected pattern: ${folderNameRegEx.source}`
        );
      }

      const lessonFolderFiles = fs.readdirSync(
        path.join(contentFolder, file, chapterFile)
      );

      if (!lessonFolderFiles.includes(instructionsFileName)) {
        assert.fail(
          `Lesson ${file}/${chapterFile} does not contain an ${instructionsFileName} file`
        );
      }
      if (!lessonFolderFiles.includes(contentManager.codeFileName)) {
        assert.fail(
          `Lesson ${file}/${chapterFile} does not contain a ${contentManager.codeFileName} file`
        );
      }

      const { codeFile, metadata } = parseLessonFolder(
        path.join(contentFolder, file, chapterFile, instructionsFileName),
        path.join(contentFolder, file, chapterFile, contentManager.codeFileName)
      );

      const metadataValidation = await hyperjumpValidate(
        metadata,
        metadataSchema
      );

      const codeFileValidation = await hyperjumpValidate(
        codeFile,
        codeFileSchema
      );

      if (!metadataValidation.valid) {
        console.log(metadata);
        assert.fail(
          `Metadata for ${file}/${chapterFile} is invalid: \n ${JSON.stringify(
            metadataValidation.errors![0],
            null,
            2
          )}`
        );
      }

      if (!codeFileValidation.valid) {
        assert.fail(
          `Code file for ${file}/${chapterFile} is invalid: \n ${JSON.stringify(
            codeFileValidation.errors![0],
            null,
            2
          )}`
        );
      }
    }
  }
});
