"use client";

import React, { useEffect } from "react";
import styles from "./page.module.css";
import classnames from "classnames";
import { outfitFont } from "../styles/fonts";

export default function Mobile() {
  useEffect(() => {
    // if not on mobile, redirect to the main page
    if (window.innerWidth > 768) {
      window.location.href = "/";
    }
  }, []);
  return (
    <div className={styles.main}>
      <div className={classnames(styles.message, outfitFont.className)}>
        We are sorry,
        <br />
        Tour of JSON Schema is not optimized for mobile devices. Please use a
        desktop computer for the best experience.
      </div>
    </div>
  );
}
