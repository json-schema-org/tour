import styles from "./styles/page.module.css";
import Link from "next/link";
import cx from "classnames";
import { interFont, outfitFont } from "./styles/fonts";
import RightArrow from "./styles/icons/RightArrow";
import CompanyLogos from "./components/CommunityLinks/CommunityLinks";

export default function Home() {
  return (
    <div className={cx(styles.main, outfitFont.className)}>
      <div className={styles.wrapper}>
        <div className={styles.titleWrapper}>
          <div className={styles.title}>
            <div>A Tour of</div>
            <div className={styles.jsonSchemaTitle}>JSON Schema</div>
          </div>
          <div className={styles.subtitleWrapper}>
            <div className={styles.subtitle1}>
              Build more. Break less. Empower others.
            </div>
            <div className={styles.subtitle2}>
              Ensure confident & reliable use of JSON data with JSON Schema
            </div>
          </div>
        </div>
        <Link href="/outline">
          <button className={styles.mainBtn}>
            START NOW
            <RightArrow />
          </button>
        </Link>
      </div>
      <div className={styles.footer}>
        <div className={cx(styles.footerText, interFont.className)}>
          Join the Community
        </div>
        <CompanyLogos />
      </div>
    </div>
  );
}
