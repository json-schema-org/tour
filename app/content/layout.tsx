"use client";
import React from "react";
import styles from "./layout.module.css";
import NavBar from "@/app/components/NavBar";
import { contentManager } from "@/lib/contentManager";
import { usePathname } from "next/navigation";

export default function PageLayout({
  children,
}: {
  children: React.ReactNode;
  params: { markdownPath: string[] };
}) {
  const urlPath = usePathname().replace("/content", "").substring(1);

  return (
    <div className={styles.wrapper}>
      <NavBar urlPath={urlPath} />

      {children}
    </div>
  );
}
