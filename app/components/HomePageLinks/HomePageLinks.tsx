import { contentManager } from "@/lib/contentManager";
import styles from "./HomePage.module.css";
import Link from "next/link";

export default function HomePageLinks() {
  const outline = contentManager.getOutline();

  const half = Math.ceil(outline.length / 2);
  const firstColumn = outline.slice(0, half);
  const secondColumn = outline.slice(half);

  return (
    <div className={styles.HomePageLinks}>
      <div className={styles.column}>
        {firstColumn.map((ele, index) => (
          <Link
            key={index}
            className={styles.HomePageLink}
            href={
              contentManager.getPathWithPrefix(ele.steps[0].fullPath) as string
            }
          >
            <span>{index + 1}. </span>
            <span className={styles.HomePageLinkTitle}>{ele.title}</span>
          </Link>
        ))}
      </div>
      <div className={styles.column}>
        {secondColumn.map((ele, index) => (
          <Link
            key={index + half + 1}
            className={styles.HomePageLink}
            href={
              contentManager.getPathWithPrefix(ele.steps[0].fullPath) as string
            }
          >
            <span>{index + half + 1}. </span>
            <span className={styles.HomePageLinkTitle}>{ele.title}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
