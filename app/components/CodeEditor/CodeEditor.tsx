"use client";

import styles from "./CodeEditor.module.css";
import ctx from "classnames";
import { GeistMono } from "geist/font/mono";
import Editor, { Monaco } from "@monaco-editor/react";
import { Flex, useColorMode } from "@chakra-ui/react";
import { useEffect, useState, useRef } from "react";
import MyBtn from "../MyBtn";
import { tryFormattingCode, validateCode } from "@/lib/client-functions";
import FiChevronRight from "@/app/styles/icons/HiChevronRightGreen";
import { useRouter } from "next/navigation";
import { useUserSolutionStore, useEditorStore } from "@/lib/stores";
import { sendGAEvent } from "@next/third-parties/google";
import { CodeFile, OutputResult } from "@/lib/types";
import { OutputReducerAction } from "@/lib/reducers";

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
const useEditorShortcuts = ({
  handleValidate,
  handleReset,
  handleNext,
  codeString,
}: {
  handleValidate: () => void;
  handleReset: () => void;
  handleNext: () => void;
  codeString: string;
}) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Enter" && event.shiftKey) {
        sendGAEvent("event", "buttonClicked", {
          value: "Validate (through shortcut)",
        });
        event.preventDefault();
        handleValidate();
      }
      
      if (
        event.key.toLowerCase() === "r" &&
        event.altKey &&
        event.shiftKey
      ) {
        sendGAEvent("event", "buttonClicked", {
          value: "Reset Code (through shortcut)",
        });
        event.preventDefault();
        handleReset();
      }
    
      if (event.key === "ArrowRight" && event.shiftKey) {
        sendGAEvent("event", "buttonClicked", {
          value: "Next Lesson (through shortcut)",
        });
        event.preventDefault();
        handleNext();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleValidate, handleReset, handleNext, codeString]);
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

// EditorControls component for the buttons section
const EditorControls = ({
  handleValidate,
  isValidating,
  resetCode,
  nextStepPath,
  outputResult,
  handleNext,
}: {
  handleValidate: () => void;
  isValidating: boolean;
  resetCode: () => void;
  nextStepPath: string | undefined;
  outputResult: OutputResult;
  handleNext: () => void;
}) => {
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

        <MyBtn onClick={resetCode} variant="error" tooltip="Alt + Shift + R">
          Reset
        </MyBtn>
      </Flex>
      <MyBtn
        onClick={handleNext}
        variant={
          outputResult.validityStatus === "valid" ? "default" : "success"
        }
        isDisabled={!nextStepPath}
        size={outputResult.validityStatus === "valid" ? "sm" : "xs"}
        tooltip="Shift + →"
      >
        Next <span style={{ marginLeft: "4px" }}></span>
        <FiChevronRight
          color="currentColor"
        />
      </MyBtn>
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
  const router = useRouter();

  // Apply custom hooks
  useEditorTheme(monaco, colorMode);

  const handleValidate = () => {
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
  };

  const resetCode = () => {
    setCodeString(JSON.stringify(codeFile.code, null, 2));
    dispatchOutput({ type: "RESET" });
  };

  const handleNext = () => {
    if (nextStepPath) router.push("/" + nextStepPath);
  };

  useEditorShortcuts({
    handleValidate,
    handleReset: resetCode,
    handleNext,
    codeString,
  });

  useCodePersistence(
    chapterIndex,
    stepIndex,
    codeString,
    setCodeString,
    codeFile,
  );

  const handleEditorMount = (editor: any, monaco: Monaco) => {
    setMonaco(monaco);

    editorRef.current = editor;
    editorStore.setEditor(editor);
    editorStore.setMonaco(monaco);
  };

  return (
    <>
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
        handleNext={handleNext}
      />
    </>
  );
}
