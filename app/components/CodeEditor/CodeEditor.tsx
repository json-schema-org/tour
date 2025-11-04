"use client";

import styles from "./CodeEditor.module.css";
import ctx from "classnames";
import { GeistMono } from "geist/font/mono";
import Editor, { Monaco } from "@monaco-editor/react";
import { Flex, useColorMode } from "@chakra-ui/react";
import { useEffect, useState, useRef, useCallback } from "react";
import MyBtn from "../MyBtn";
import { tryFormattingCode, validateCode } from "@/lib/client-functions";
import FiChevronRight from "@/app/styles/icons/HiChevronRightGreen";
import { useRouter } from "next/navigation";
import { useEditorStore } from "@/lib/stores";
import { sendGAEvent } from "@next/third-parties/google";
import { CodeFile, OutputResult } from "@/lib/types";
import { OutputReducerAction } from "@/lib/reducers";
import CertificateButton from "../CertificateButton/CertificateButton";
import {
  useEditorTheme,
  useValidationShortcut,
  useCodePersistence,
  useValidationRestore,
} from "@/app/utils/hooks";

// EditorControls component for the buttons section
const EditorControls = ({
  handleValidate,
  isValidating,
  resetCode,
  nextStepPath,
  outputResult,
}: {
  handleValidate: () => void;
  isValidating: boolean;
  resetCode: () => void;
  nextStepPath: string | undefined;
  outputResult: OutputResult;
}) => {
  const router = useRouter();
  return (
    <div className={styles.buttonsWrapper}>
      <Flex dir="row" gap="8px" alignItems="end">
        <MyBtn
          onClick={handleValidate}
          variant={
            outputResult.validityStatus === "valid" ? "success" : "default"
          }
          isDisabled={isValidating}
          tooltip="Shift + Enter"
        >
          {isValidating ? "Validating ..." : "Validate"}
        </MyBtn>

        <MyBtn onClick={resetCode} variant="error">
          Reset
        </MyBtn>
      </Flex>
      {!nextStepPath ? (
        <CertificateButton />
      ) : (
        <MyBtn
          onClick={() => router.push("/" + nextStepPath)}
          variant={
            outputResult.validityStatus === "valid" ? "default" : "success"
          }
          size={outputResult.validityStatus === "valid" ? "sm" : "xs"}
        >
          Next <span style={{ marginLeft: "4px" }}></span>
          <FiChevronRight
            color={
              outputResult.validityStatus === "valid"
                ? "white"
                : "hsl(var(--success))"
            }
          />
        </MyBtn>
      )}
    </div>
  );
};

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
  const [isValidating, setIsValidating] = useState(false);
  const editorStore = useEditorStore();
  const editorRef = useRef<any>(null);

  // Apply custom hooks
  useEditorTheme(monaco, colorMode);

  const handleValidate = useCallback(() => {
    setIsValidating(true);
    setTimeout(() => {
      tryFormattingCode(editorRef, setCodeString);
      validateCode(
        codeString,
        codeFile,
        dispatchOutput,
        stepIndex,
        chapterIndex,
      );
      setIsValidating(false);
    }, 500);
  }, [codeString, codeFile, dispatchOutput, stepIndex, chapterIndex, setCodeString]);

  useValidationShortcut(handleValidate, codeString);
  useCodePersistence(
    chapterIndex,
    stepIndex,
    codeString,
    setCodeString,
    codeFile,
  );

  // Restore previous validation on lesson revisit
  const { isRestored } = useValidationRestore(
    chapterIndex,
    stepIndex,
    dispatchOutput,
    setCodeString,
  );

  // Reset code to initial state
  const resetCode = () => {
    setCodeString(JSON.stringify(codeFile.code, null, 2));
    dispatchOutput({ type: "RESET" });
  };

  const handleEditorMount = (editor: any, monacoInstance: Monaco) => {
    setMonaco(monacoInstance);

    editorRef.current = editor;
    editorStore.setEditor(editor);
    editorStore.setMonaco(monacoInstance);
  };

  return (
    <>
      {/* Show success banner when previous validation is restored */}
      {isRestored && (
        <div
          style={{
            padding: "8px 12px",
            backgroundColor: "#e8f5e8",
            borderLeft: "3px solid #4caf50",
            marginBottom: "8px",
            fontSize: "14px",
            color: "#2e7d32",
          }}
        >
          ✅ Previous submission restored
        </div>
      )}

      <div className={ctx(styles.codeEditor, GeistMono.className)}>
        <Editor
          language="json"
          defaultValue={codeString}
          theme={colorMode === "light" ? "light" : "my-theme"}
          value={codeString}
          height="100%"
          onChange={(codeString) => setCodeString(codeString ?? "")}
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            formatOnPaste: true,
            formatOnType: true,
          }}
          onMount={handleEditorMount}
        />
      </div>
      <EditorControls
        handleValidate={handleValidate}
        isValidating={isValidating}
        resetCode={resetCode}
        nextStepPath={nextStepPath}
        outputResult={outputResult}
      />
    </>
  );
}
