"use client";

import styles from "./styles/page.module.css";
import Link from "next/link";
import cx from "classnames";
import { interFont, outfitFont } from "./styles/fonts";
import RightArrow from "./styles/icons/rightArrow";
import { useMemo } from "react";
import { useColorMode } from "@chakra-ui/react";
function CompanyLogos() {
  const { colorMode } = useColorMode();

  const logoInfo = useMemo(() => {
    const logos: {
      [key: string]: string;
    } = {};
    if (colorMode == "dark") {
      logos["postman"] = "postman-dark";
      logos["microsoft"] = "microsoft-dark";
      logos["github"] = "github-dark";
      logos["zapier"] = "zapier-dark";
    } else {
      logos["postman"] = "postman";
      logos["microsoft"] = "microsoft";
      logos["github"] = "github";
      logos["zapier"] = "zapier";
    }

    return [
      {
        logo: logos["postman"],
        height: "24px",
        width: "79.08px",
      },
      { logo: logos["microsoft"], height: "18px", width: "77.38px" },
      { logo: logos["github"], height: "18px", width: "59.14px" },
      { logo: logos["zapier"], height: "18px", width: "66.57px" },
    ];
  }, [colorMode]);
  return (
    <div className={styles.footerLogos}>
      {logoInfo.map((info) => (
        <img
          key={info.logo}
          src={`/logos/${info.logo}.png`}
          alt={info.logo}
          className={styles.companyLogo}
          style={{
            height: info.height,
            width: info.width,
          }}
        />
      ))}
    </div>
  );
}

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
          Adopted by
        </div>
        <CompanyLogos />
      </div>
    </div>
  );
}
