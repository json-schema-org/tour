import React from "react";
import { useMemo } from "react";
import { useColorMode } from "@chakra-ui/react";
import styles from "./CommunityLinks.module.css";
import Link from "next/link";

export default function CompanyLogos() {
  const linkInfo = useMemo(() => {
    return [
      { title: "Github", link: "https://github.com/json-schema-org" },
      { title: "Slack", link: "https://json-schema.org/slack" },
      { title: "Twitter", link: "https://x.com/jsonschema" },
      {
        title: "Youtube",
        link: "https://www.youtube.com/@JSONSchemaOrgOfficial",
      },
      {
        title: "LinkedIn",
        link: "https://www.linkedin.com/company/jsonschema",
      },
    ];
  }, []);

  return (
    <div className={styles.footerLinks}>
      {linkInfo.map((info) => (
        <Link key={info.title} href={info.link} className={styles.footerLink}>
          {info.title}
        </Link>
      ))}
    </div>
  );
}
