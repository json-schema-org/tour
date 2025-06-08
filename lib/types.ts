import { InvalidSchemaError } from "@hyperjump/json-schema/draft-2020-12";

export type TabType = "description" | "solution";

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

export type TestCaseResult = TestCase & {
  actual: Boolean;
  errors?: string | undefined;
  passed: Boolean;
};

export type CodeFile = {
  code: Object;
  testCases: TestCase[];
  solution: Object;
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
  selectedTab?: TabType;
};
