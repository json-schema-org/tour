"use client";
import React from "react";
import { useMemo } from "react";
import { useColorMode } from "@chakra-ui/react";
import Image, { StaticImageData } from "next/image";
import PostMan from "@/public/logos/postman.png";
import Microsoft from "@/public/logos/microsoft.png";
import GitHub from "@/public/logos/github.png";
import Zapier from "@/public/logos/zapier.png";
import PostManDark from "@/public/logos/postman-dark.png";
import MicrosoftDark from "@/public/logos/microsoft-dark.png";
import GitHubDark from "@/public/logos/github-dark.png";
import ZapierDark from "@/public/logos/zapier-dark.png";
import styles from "./CompanyLogos.module.css";

export default function CompanyLogos() {
  const { colorMode } = useColorMode();

  const logoInfo = useMemo(() => {
    const logos: {
      [key: string]: StaticImageData;
    } = {};
    if (colorMode == "dark") {
      logos["postman"] = PostManDark;
      logos["microsoft"] = MicrosoftDark;
      logos["github"] = GitHubDark;
      logos["zapier"] = ZapierDark;
    } else {
      logos["postman"] = PostMan;
      logos["microsoft"] = Microsoft;
      logos["github"] = GitHub;
      logos["zapier"] = Zapier;
    }

    return [
      {
        logo: logos["postman"],
        height: 24,
        width: 79.08,
      },
      { logo: logos["microsoft"], height: 18, width: 77.38 },
      { logo: logos["github"], height: 18, width: 59.14 },
      { logo: logos["zapier"], height: 18, width: 66.57 },
    ];
  }, [colorMode]);

  return (
    <div className={styles.footerLogos}>
      {logoInfo.map((info) => (
        <Image
          key={info.logo.src}
          src={info.logo.src}
          alt={info.logo.src}
          className={styles.companyLogo}
          height={info.height}
          width={info.width}
          style={{
            height: `${info.height}px`,
            width: `${info.width}px`,
          }}
        />
      ))}
    </div>
  );
}
