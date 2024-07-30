"use client";

import styles from "./CodeEditor.module.css";
import ctx from "classnames";
import { GeistMono } from "geist/font/mono";
import Editor, { useMonaco } from "@monaco-editor/react";
import { Flex, useColorMode } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import SmallBtn from "../SmallBtn";
import { CodeFile } from "@/lib/types";
import { OutputReducerAction } from "@/lib/reducers";
import { validateCode } from "@/lib/client-functions";
import FiChevronRight from "@/app/styles/icons/HiChevronRightGreen";
import { useRouter } from "next/navigation";

export default function CodeEditor({
  codeString,
  setCodeString,
  codeFile,
  dispatchOutput,
  nextStepPath,
  stepIndex,
  chapterIndex,
}: {
  codeString: string;
  setCodeString: (codeString: string) => void;
  codeFile: CodeFile;
  dispatchOutput: React.Dispatch<OutputReducerAction>;
  nextStepPath: string | undefined;
  stepIndex: number;
  chapterIndex: number;
}) {
  const { colorMode } = useColorMode();
  const [monaco, setMonaco] = useState<any>(null);
  const router = useRouter();

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
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // event.preventDefault();
      if (event.key == "Enter" && event.shiftKey) {
        event.preventDefault(); // Prevent default behavior
        validateCode(
          codeString,
          codeFile,
          dispatchOutput,
          stepIndex,
          chapterIndex,
        );
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [codeString]);
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
          onMount={(editor, monaco) => {
            setMonaco(monaco);
            // editor.focus();
          }}
        />
      </div>
      <div className={styles.buttonsWrapper}>
        <Flex dir="row" gap={"8px"}>
          <SmallBtn
            onClick={async () =>
              validateCode(
                codeString,
                codeFile,
                dispatchOutput,
                stepIndex,
                chapterIndex,
              )
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
            if (nextStepPath) router.push("/" + nextStepPath);
          }}
          variant={"success"}
          isDisabled={!nextStepPath}
        >
          Next
          <FiChevronRight />
        </SmallBtn>
      </div>
    </>
  );
}
