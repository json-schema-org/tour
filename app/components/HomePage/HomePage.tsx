import { contentManager } from "@/lib/contentManager"
import styles from "./HomePage.module.css"
import Link from "next/link"

export default function () {
  const outline = contentManager.getOutline()

  const firstColumn = outline.slice(0, 4)
  const secondColumn = outline.slice(4, 8)

  return (
    <div className={styles.HomePageLinks}>
      <div className={styles.column}>
        {firstColumn.map((ele, index) => (
          <Link key={index} className={styles.HomePageLink} href={contentManager.getPathWithPrefix(ele.steps[0].fullPath) as string}>
            <span>{index + 1}. </span>
            <span className={styles.HomePageLinkTitle}>{ele.title}</span>
          </Link>
        ))}
      </div>
      <div className={styles.column}>
        {secondColumn.map((ele, index) => (
          <Link key={index + 5} className={styles.HomePageLink} href={contentManager.getPathWithPrefix(ele.steps[0].fullPath) as string}>
            <span>{index + 5}. </span>
            <span className={styles.HomePageLinkTitle}>{ele.title}</span>
          </Link>
        ))}
      </div>
    </div>
  )
}