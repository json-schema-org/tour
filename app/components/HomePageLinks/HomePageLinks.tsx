import { contentManager } from "@/lib/contentManager";
import styles from "./HomePageLinks.module.css";
import Link from "next/link";
import { useMemo } from "react";
import CommunityLinksStyles from "@/app/components/CommunityLinks/CommunityLinks.module.css";

export default function HomePageLinks() {
  const outline = contentManager.getOutline();
  const totalChapters = contentManager.getTotalChapters();
  const chapterInfo: {
    title: string;
    link: string;
  }[] = useMemo(() => {
    const chapterInfo = [];
    for (let i = 0; i < totalChapters; i++) {
      const chapter = outline[i];
      chapterInfo.push({
        title: chapter.title,
        link: contentManager.getPathWithPrefix(
          chapter.steps[0].fullPath,
        ) as string,
      });
    }
    return chapterInfo;
  }, []);

  return (
    <div className={styles.HomePageLinks}>
      {chapterInfo.map((chapter, index) => (
        <Link
          key={index}
          href={chapter.link}
          className={CommunityLinksStyles.footerLink}
        >
          {index + 1}. {chapter.title}
        </Link>
      ))}
    </div>
  );
}
