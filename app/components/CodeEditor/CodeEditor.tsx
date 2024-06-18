"use client";

import styles from "./CodeEditor.module.css";
import ctx from "classnames";
import { GeistMono } from "geist/font/mono";
import Editor, { useMonaco } from "@monaco-editor/react";
import { Button, useColorMode } from "@chakra-ui/react";

export default function CodeEditor({
  code,
  setCode,
}: {
  code: string;
  setCode: (code: string) => void;
}) {
  const { colorMode } = useColorMode();
  const monaco = useMonaco();
  monaco.editor.defineTheme("my-theme", {
    base: "vs-dark",
    inherit: true,
    rules: [],
    colors: {
      "editor.background": "#000000",
    },
  });
  return (
    <div className={ctx(styles.codeEditor, GeistMono.className)}>
      <Editor
        language="json"
        defaultValue={code}
        theme={colorMode === "light" ? "light" : "my-theme"}
        value={code}
        height={"100%"}
        onChange={(code) => setCode(code ? code : "")}
        options={{ minimap: { enabled: false }, fontSize: 14 }}
      />
    </div>
  );
}
