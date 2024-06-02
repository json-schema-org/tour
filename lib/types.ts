import { OutputUnit } from "@hyperjump/json-schema/draft-2020-12";

export type ChapterStep = {
  title: string;
  fileName: string;
  fullPath: string;
  nextStepFullPath?: string;
  previousStepFullPath?: string;
};

export type Chapter = {
  title: string;
  folderName: string;
  steps: ChapterStep[];
};

export type ContentOutline = Chapter[];

export type Metadata = {
  title: string;
  description: string;
  keywords: string;
};

export type TestCase = {
  input: Object;
  expected: Boolean;
};

// type schemaSafeError = {
//   instanceLocation: string;
//   keywordLocation: string;
// };

export type FailedTestCase = TestCase & {
  actual: Boolean;
  errors?: string | undefined;
};

export type CodeFile = {
  code: Object;
  testCases: TestCase[];
  solution: Object;
};
export type CodeFileExports = {
  exports: CodeFile;
};

export type OutputResult = {
  validityStatus: "valid" | "invalid" | "neutral" | "syntaxError";
  failedTestCases?: FailedTestCase[];
  totalTestCases?: number;
  errors?: string;
};
