"use client";

import styles from "./CodeEditor.module.css";
import ctx from "classnames";
import { GeistMono } from "geist/font/mono";
import Editor, { useMonaco } from "@monaco-editor/react";
import { Flex, useColorMode } from "@chakra-ui/react";
import { useEffect } from "react";
import SmallBtn from "../SmallBtn";
import { CodeFile } from "@/lib/types";
import { OutputReducerAction } from "@/lib/reducers";
import { validateCode } from "@/lib/client-functions";
import FiChevronRight from "@/app/styles/icons/HiChevronRightGreen";

export default function CodeEditor({
  codeString,
  setCodeString,
  codeFile,
  dispatchOutput,
}: {
  codeString: string;
  setCodeString: (codeString: string) => void;
  codeFile: CodeFile;
  dispatchOutput: React.Dispatch<OutputReducerAction>;
}) {
  const { colorMode } = useColorMode();
  const monaco = useMonaco();

  useEffect(() => {
    if (monaco) {
      monaco.editor.defineTheme("my-theme", {
        base: "vs-dark",
        inherit: true,
        rules: [],
        colors: {
          "editor.background": "#000000",
        },
      });
      monaco.editor.setTheme(colorMode === "light" ? "light" : "my-theme");
    }
  }, [monaco, colorMode]);
  return (
    <>
      <div className={ctx(styles.codeEditor, GeistMono.className)}>
        <Editor
          language="json"
          defaultValue={codeString}
          theme={colorMode === "light" ? "light" : "my-theme"}
          value={codeString}
          height={"100%"}
          onChange={(codeString) => setCodeString(codeString ? codeString : "")}
          options={{ minimap: { enabled: false }, fontSize: 14 }}
        />
      </div>
      <div className={styles.buttonsWrapper}>
        <Flex dir="row" gap={"8px"}>
          <SmallBtn
            onClick={async () =>
              validateCode(codeString, codeFile, dispatchOutput)
            }
            variant={"default"}
          >
            Validate
          </SmallBtn>

          <SmallBtn
            onClick={() => {
              setCodeString(JSON.stringify(codeFile.code, null, 2));
              dispatchOutput({ type: "RESET" });
            }}
            variant={"error"}
          >
            Reset
          </SmallBtn>
        </Flex>
        <SmallBtn
          onClick={() => {
            setCodeString(JSON.stringify(codeFile.solution, null, 2));
          }}
          variant={"success"}
        >
          Next
          <FiChevronRight />
        </SmallBtn>
      </div>
    </>
  );
}
