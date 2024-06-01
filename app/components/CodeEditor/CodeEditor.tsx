"use client";

import styles from "./CodeEditor.module.css";
import ctx from "classnames";
import { GeistMono } from "geist/font/mono";
import Editor from "@monaco-editor/react";
import { Button } from "@chakra-ui/react";

export default function CodeEditor({
  code,
  setCode,
}: {
  code: string;
  setCode: (code: string) => void;
}) {
  return (
    <div className={ctx(styles.codeEditor, GeistMono.className)}>
      <Editor
        language="json"
        defaultValue={code}
        value={code}
        height={"100%"}
        onChange={(code) => setCode(code ? code : "")}
        options={{ minimap: { enabled: false }, fontSize: 14 }}
      />
    </div>
  );
}
