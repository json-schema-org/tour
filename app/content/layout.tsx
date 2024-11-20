"use client";
import React from "react";
import styles from "./layout.module.css";
import NavBar from "@/app/components/NavBar";
import { usePathname } from "next/navigation";
import { setCheckpoint } from "@/lib/progressSaving";

export default function PageLayout({
  children,
}: {
  children: React.ReactNode;
  params: { markdownPath: string[] };
}) {
  const urlPath = usePathname().replace("/content", "").substring(1);
  setCheckpoint(`content/${urlPath}`);
  return (
    <div className={styles.wrapper}>
      <NavBar urlPath={urlPath} />

      {children}
    </div>
  );
}
