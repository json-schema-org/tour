type ChapterStep = {
  title: string;
  fileName: string;
  fullPath: string;
};

type Chapter = {
  title: string;
  folderName: string;
  steps: ChapterStep[];
};

export type ContentOutline = {
  chapters: Chapter[];
};

export type metadata = {
  title: string;
};
