"use client";
import React, { useEffect } from "react";
import styles from "./page.module.css";
import NavBar from "../components/NavBar";

export default function PageLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { markdownPath: string[] };
}) {
  const urlPath = params.markdownPath.join("/");
  useEffect(() => {
    console.log("urlPath", urlPath);
  }, []);
  return (
    <div className={styles.wrapper}>
      <NavBar urlPath={urlPath} />
      {children}
    </div>
  );
}
