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

export type FailedTestCase = TestCase & {
  actual: Boolean;
  errors: any;
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
  validityStatus: "valid" | "invalid" | "neutral";
  failedTestCases?: FailedTestCase[];
  totalTestCases?: number;
  errors?: any;
};
