"use client";

import Editor, { Monaco } from "@monaco-editor/react";
import { useColorMode } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useUserSolutionStore } from "@/lib/stores";
import styles from "./SolutionTab.module.css";
import MyBtn from "../MyBtn/MyBtn";

type SolutionTabProps = {
  solution: string;
};

const useEditorTheme = (monaco: Monaco, colorMode: "dark" | "light") => {
  useEffect(() => {
    if (monaco) {
      monaco.editor.defineTheme("my-theme", {
        base: "vs-dark",
        inherit: true,
        rules: [],
        colors: {
          "editor.background": "#1f1f1f",
        },
      });
      monaco.editor.setTheme(colorMode === "light" ? "light" : "my-theme");
    }
  }, [monaco, colorMode]);
};

const SolutionTab = ({ solution }: SolutionTabProps) => {
  const { colorMode } = useColorMode();
  const [monaco, setMonaco] = useState<any>(null);

  const { setCodeString } = useUserSolutionStore();

  function useSolution() {
    setCodeString(solution);
  }

  // Apply custom hooks
  useEditorTheme(monaco, colorMode);
  return (
    <div className={styles.container}>
      <Editor
        language="json"
        theme={colorMode === "light" ? "light" : "my-theme"}
        value={String(solution)}
        height="90%"
        options={{
          minimap: { enabled: false },
          fontSize: 14,
        }}
        // dont allow to edit the solution
        onMount={(editor, monacoInstance) => {
          setMonaco(monacoInstance);
          editor.updateOptions({ readOnly: true });
        }}
      />
      <MyBtn onClick={useSolution} variant={"default"} size="sm" position="right">
        Use this solution
      </MyBtn>
    </div>
  );
};

export default SolutionTab;
