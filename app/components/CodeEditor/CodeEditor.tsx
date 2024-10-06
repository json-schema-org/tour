"use client";

import styles from "./CodeEditor.module.css";
import ctx from "classnames";
import { GeistMono } from "geist/font/mono";
import Editor, { useMonaco } from "@monaco-editor/react";
import { Flex, useColorMode } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import MyBtn from "../MyBtn";
import { CodeFile, OutputResult } from "@/lib/types";
import { OutputReducerAction } from "@/lib/reducers";
import { validateCode } from "@/lib/client-functions";
import FiChevronRight from "@/app/styles/icons/HiChevronRightGreen";
import { useRouter } from "next/navigation";
import { useEditorStore } from "@/lib/stores";
import { sendGAEvent } from "@next/third-parties/google";

export default function CodeEditor({
  codeString,
  setCodeString,
  codeFile,
  dispatchOutput,
  nextStepPath,
  stepIndex,
  chapterIndex,
  outputResult,
}: {
  codeString: string;
  setCodeString: (codeString: string) => void;
  codeFile: CodeFile;
  dispatchOutput: React.Dispatch<OutputReducerAction>;
  nextStepPath: string | undefined;
  stepIndex: number;
  chapterIndex: number;
  outputResult: OutputResult;
}) {
  const { colorMode } = useColorMode();
  const [monaco, setMonaco] = useState<any>(null);
  const router = useRouter();
  const editorStore = useEditorStore();

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
        sendGAEvent("event", "buttonClicked", {
          value: "Validate (through shortcut)",
        });
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
            editorStore.setEditor(editor);
            editorStore.setMonaco(monaco);
          }}
        />
      </div>
      <div className={styles.buttonsWrapper}>
        <Flex dir="row" gap={"8px"} alignItems={"end"}>
          <MyBtn
            onClick={async () =>
              validateCode(
                codeString,
                codeFile,
                dispatchOutput,
                stepIndex,
                chapterIndex,
              )
            }
            variant={
              outputResult.validityStatus === "valid" ? "success" : "default"
            }
            tooltip="Shift + Enter"
          >
            Validate
          </MyBtn>

          <MyBtn
            onClick={() => {
              setCodeString(JSON.stringify(codeFile.code, null, 2));
              dispatchOutput({ type: "RESET" });
            }}
            variant={"error"}
          >
            Reset
          </MyBtn>
        </Flex>
        <MyBtn
          onClick={() => {
            if (nextStepPath) router.push("/" + nextStepPath);
          }}
          variant={
            outputResult.validityStatus === "valid" ? "default" : "success"
          }
          isDisabled={!nextStepPath}
          size={outputResult.validityStatus === "valid" ? "sm" : "xs"}
        >
          Next <span style={{ marginLeft: "4px" }}></span>
          <FiChevronRight
            color={
              outputResult.validityStatus === "valid"
                ? "white"
                : "hsl(var(--background))"
            }
          />
        </MyBtn>
      </div>
    </>
  );
}
