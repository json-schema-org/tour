import styles from "./styles/page.module.css";
import cx from "classnames";
import { interFont, outfitFont } from "./styles/fonts";
import CompanyLogos from "./components/CommunityLinks/CommunityLinks";
import HomePageLinks from "./components/HomePageLinks/HomePageLinks";
import dynamic from "next/dynamic";
// import CheckpointRedirect from "./components/CheckPointRedirect/CheckPointRedirect";

const CheckpointRedirect = dynamic(
  () => import("./components/ContinueBtn/ContinueBtn"),
  { ssr: false },
);

export default function Home() {
  return (
    <div className={cx(styles.main, outfitFont.className)}>
      <div className={styles.wrapper}>
        <div className={styles.backgroundClipWrapper}>
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
        </div>
        <div className={styles.homePageLinksWrapper}>
          <HomePageLinks />
          <div className={styles.continueBtn}>
            <CheckpointRedirect />
          </div>
        </div>
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
