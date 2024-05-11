class Crawler {
  constructor(contentFolderPath?: string) {
    if (!contentFolderPath) {
      contentFolderPath = "content";
    }
    console.log("Crawler constructor");
  }
}
