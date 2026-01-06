import { InvalidSchemaError } from "@hyperjump/json-schema/draft-2020-12";

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
  input: unknown;
  expected: boolean;
};

export type TestCaseResult = TestCase & {
  actual: boolean;
  errors?: string;
  passed: boolean;
};

export type CodeFile = {
  code: unknown;
  testCases: TestCase[];
  solution: unknown;
  expectedAnnotations?: string[];
  externalSchema?: any;
};

export type CodeFileExports = {
  exports: CodeFile;
};

export type OutputResult = {
  validityStatus:
    | "valid"
    | "invalid"
    | "neutral"
    | "syntaxError"
    | "invalidSchema";
  testCaseResults?: TestCaseResult[];
  totalTestCases?: number;
  errors?: InvalidSchemaError | string;
};
