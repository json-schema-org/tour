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
};

export type CodeFile = {
  code: Object;
};
export type CodeFileExports = {
  exports: CodeFile;
};
