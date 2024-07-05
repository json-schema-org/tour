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
import { useRouter } from "next/navigation";

export default function CodeEditor({
  codeString,
  setCodeString,
  codeFile,
  dispatchOutput,
  nextStepPath,
}: {
  codeString: string;
  setCodeString: (codeString: string) => void;
  codeFile: CodeFile;
  dispatchOutput: React.Dispatch<OutputReducerAction>;
  nextStepPath: string | undefined;
}) {
  const { colorMode } = useColorMode();
  const monaco = useMonaco();
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
