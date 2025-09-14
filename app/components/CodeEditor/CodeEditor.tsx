"use client";

import styles from "./CodeEditor.module.css";
import ctx from "classnames";
import { GeistMono } from "geist/font/mono";
import Editor, { Monaco } from "@monaco-editor/react";
import { Flex, useColorMode } from "@chakra-ui/react";
import { useEffect, useState, useRef, useCallback } from "react";
import MyBtn from "../MyBtn";
import {
  tryFormattingCode,
  validateCode,
  restorePreviousValidation,
  hasValidationResult,
} from "@/lib/client-functions";
import FiChevronRight from "@/app/styles/icons/HiChevronRightGreen";
import { useRouter } from "next/navigation";
import { useUserSolutionStore, useEditorStore } from "@/lib/stores";
import { sendGAEvent } from "@next/third-parties/google";
import { CodeFile, OutputResult } from "@/lib/types";
import { OutputReducerAction } from "@/lib/reducers";
import CertificateButton from "../CertificateButton/CertificateButton";

// Custom hook for editor theme setup
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

// Custom hook for keyboard shortcuts
const useValidationShortcut = (
  handleValidate: () => void,
  codeString: string,
) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Enter" && event.shiftKey) {
        sendGAEvent("event", "buttonClicked", {
          value: "Validate (through shortcut)",
        });
        event.preventDefault();
        handleValidate();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleValidate, codeString]);
};

// Custom hook for code persistence
const useCodePersistence = (
  chapterIndex: number,
  stepIndex: number,
  codeString: string,
  setCodeString: (value: string) => void,
  codeFile: CodeFile,
) => {
  const userSolutionStore = useUserSolutionStore();

  // Load saved code
  useEffect(() => {
    const savedCode = userSolutionStore.getSavedUserSolutionByLesson(
      chapterIndex,
      stepIndex,
    );
    if (savedCode && savedCode !== codeString) {
      setCodeString(savedCode);
    }
  }, [chapterIndex, stepIndex]);

  // Save code changes
  useEffect(() => {
    userSolutionStore.saveUserSolutionForLesson(
      chapterIndex,
      stepIndex,
      codeString,
    );
  }, [codeString, chapterIndex, stepIndex]);

  // Initialize code if no saved solutions
  useEffect(() => {
    if (Object.keys(userSolutionStore.userSolutionsByLesson).length === 0) {
      setCodeString(JSON.stringify(codeFile.code, null, 2));
    }
  }, [userSolutionStore]);
};

// Custom hook for validation restoration
const useValidationRestore = (
  chapterIndex: number,
  stepIndex: number,
  dispatchOutput: React.Dispatch<OutputReducerAction>,
  setCodeString: (value: string) => void,
) => {
  const [isRestored, setIsRestored] = useState(false);

  useEffect(() => {
    // Restore previous validation on component mount or when lesson changes
    if (!isRestored && hasValidationResult(chapterIndex, stepIndex)) {
      try {
        const { restored } = restorePreviousValidation(
          chapterIndex, 
          stepIndex, 
          dispatchOutput, 
          setCodeString
        );
        if (restored) {
          setIsRestored(true);
          console.log('✅ Previous validation restored for lesson:', chapterIndex, stepIndex);
        }
      } catch (error) {
        console.error('Failed to restore validation:', error);
      }
    }
  }, [chapterIndex, stepIndex, isRestored, dispatchOutput, setCodeString]);

  return { isRestored };
};


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
  }, [codeString, codeFile, dispatchOutput, stepIndex, chapterIndex]);

  useValidationShortcut(handleValidate, codeString);
  useCodePersistence(
    chapterIndex,
    stepIndex,
    codeString,
    setCodeString,
    codeFile,
  );

  const { isRestored } = useValidationRestore(
    chapterIndex,
    stepIndex,
    dispatchOutput,
    setCodeString,
  );

  const resetCode = () => {
    setCodeString(JSON.stringify(codeFile.code, null, 2));
    dispatchOutput({ type: "RESET" });
  };

  const handleEditorMount = (editor: monaco.editor.IStandaloneCodeEditor, monacoInstance: Monaco) => {
    setMonaco(monacoInstance);

    editorRef.current = editor;
    editorStore.setEditor(editor);
    editorStore.setMonaco(monacoInstance);
  };

  return (
    <>
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
