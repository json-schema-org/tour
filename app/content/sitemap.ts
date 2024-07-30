import { contentManager } from "@/lib/contentManager";

type SitemapItem = {
  url: string;
  lastModified: Date;
};

export default async function sitemap() {
  const outline = contentManager.getOutline();
  const pathList: { markdownPath: string[] }[] = [];

  outline.map((item) => {
    item.steps.map((step) => {
      pathList.push({
        markdownPath: [item.folderName, step.fileName],
      });
    });
  });

  const sitemapItems: SitemapItem[] = pathList.map((path) => {
    return {
      url: `https://tour.json-schema.org/${contentManager.getPathWithPrefix(
        path.markdownPath.join("/"),
      )}`,
      lastModified: new Date(),
    };
  });

  return sitemapItems;
}
