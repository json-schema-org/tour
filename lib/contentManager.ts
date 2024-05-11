import { ContentOutline } from "./types";
import fs from "fs";

// the content is stored in the content folder
// this contentManager object will generate a outline of type ContentOutline
// it will keep track of the active chapter and step
// return full path of the active step
// return the next step
// return the previous step
// return the next chapter
// return the previous chapter
// change the active chapter
// change the active step

/* 
The content folder follows this structure:

├── 01-introduction
|   ├── index.mdx
│   ├── 01-welcome.mdx
│   ├── 02-what-is-react.mdx
├── 02-types
│   ├── index.mdx
│   ├── 01-primitive-types.mdx
│   ├── 02-arrays.mdx
├─

*/

export default class ContentManager {
  private contentFolderPath: string = "./content";
  public outline: ContentOutline;
  constructor() {
    this.outline = this.generateOutline();
    console.log("yoyo");
  }

  private generateOutline(): ContentOutline {
    const contentOutline: ContentOutline = { chapters: [] };
    const files = fs.readdirSync(this.contentFolderPath, {
      withFileTypes: true,
    });
    files.forEach((file) => {
      if (file.isDirectory()) {
        const chapter = { title: file.name, folderName: file.name, steps: [] };
        const chapterPath = `${this.contentFolderPath}/${file.name}`;
        const chapterFiles = fs.readdirSync(chapterPath, {
          withFileTypes: true,
        });
        chapterFiles.forEach((chapterFile) => {
          if (chapterFile.isFile()) {
            const fileName = chapterFile.name;
            const fullPath = `${chapterPath}/${fileName}`;
            const title = fileName.split("-")[1].split(".")[0].trim();
            chapter.steps.push({ title, fileName, fullPath });
          }
        });
        contentOutline.chapters.push(chapter);
      }
    });

    return contentOutline;
  }
}
