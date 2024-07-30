"use client";

import { useEditorStore } from "@/lib/stores";
import React from "react";
import styles from "./SideEditorLink.module.css";

export default function SideEditorLink() {
  const editorStore = useEditorStore();
  return (
    <span
      className={styles.main}
      onClick={() => {
        const range = editorStore.editor.getModel().getFullModelRange();
        console.log(range);
        editorStore.editor.setSelection(range);
        editorStore.editor.focus();
      }}
    >
      side editor
    </span>
  );
}
