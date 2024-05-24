"use client";
import { CodeFile } from "@/lib/types";

import styles from "./CodeEditor.module.css";
import ctx from "classnames";
import { GeistMono } from "geist/font/mono";
import Editor from "@monaco-editor/react";

export default function CodeEditor({ code }: { code: Object }) {
  const codeString = JSON.stringify(code, null, 2);
  return (
    <div className={ctx(styles.codeEditor, GeistMono.className)}>
      <Editor language="jsonc" defaultValue={codeString} />
    </div>
  );
}
