"use client";

import { useEditorStore } from "@/lib/stores";
import React from "react";
import styles from "./SideEditorLink.module.css";

export default function SideEditorLink({
  text = "side editor",
}: {
  text: string;
}) {
  const editorStore = useEditorStore();
  return (
    <span
      className={styles.main}
      onClick={() => {
        const range = editorStore.editor.getModel().getFullModelRange();
        editorStore.editor.setSelection(range);
        editorStore.editor.focus();
      }}
    >
      {text}
    </span>
  );
}
