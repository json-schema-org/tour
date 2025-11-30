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
import CertificateButton from "../CertificateButton/CertificateButton";

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

const useCodePersistence = (
  chapterIndex: number,
  stepIndex: number,
  codeString: string,
  setCodeString: (value: string) => void,
  codeFile: CodeFile,
) => {
  const userSolutionStore = useUserSolutionStore();

  useEffect(() => {
    const savedCode = userSolutionStore.getSavedUserSolutionByLesson(
      chapterIndex,
      stepIndex,
    );
    if (savedCode && savedCode !== codeString) {
      setCodeString(savedCode);
    }
  }, [chapterIndex, stepIndex]);


  useEffect(() => {
    if (Object.keys(userSolutionStore.userSolutionsByLesson).length === 0) {
      setCodeString(JSON.stringify(codeFile.code, null, 2));
    }
  }, [userSolutionStore]);

  return userSolutionStore;
};

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
  solutionRequested,
  resetSolution,
  hasValidated,
}: {
  codeString: string;
  setCodeString: (codeString: string) => void;
  codeFile: CodeFile;
  dispatchOutput: React.Dispatch<OutputReducerAction>;
  nextStepPath: string | undefined;
  stepIndex: number;
  chapterIndex: number;
  outputResult: OutputResult;
  solutionRequested: boolean;
  resetSolution: () => void;
  hasValidated: boolean;
}) {
  const { colorMode } = useColorMode();
  const [monaco, setMonaco] = useState<any>(null);
  const [isValidating, setIsValidating] = useState(false);
  const editorStore = useEditorStore();
  const editorRef = useRef<any>(null);

  const [activeView, setActiveView] = useState<'code' | 'solution'>('code');

  useEditorTheme(monaco, colorMode);

  const userSolutionStore = useCodePersistence(
    chapterIndex,
    stepIndex,
    codeString,
    setCodeString,
    codeFile,
  );

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

  useValidationShortcut(handleValidate, codeString);

  const resetCode = () => {
    const initialCode = JSON.stringify(codeFile.code, null, 2);
    setCodeString(initialCode);
    dispatchOutput({ type: "RESET" });

    resetSolution();
    setActiveView('code');

    userSolutionStore.saveUserSolutionForLesson(chapterIndex, stepIndex, initialCode);
  };

  const handleEditorMount = (editor: any, monaco: Monaco) => {
    setMonaco(monaco);
    editorRef.current = editor;
    editorStore.setEditor(editor);
    editorStore.setMonaco(monaco);
  };

  const handleCodeChange = (newCode: string | undefined) => {
    if (activeView === 'code' && newCode !== undefined) {
      setCodeString(newCode);
      userSolutionStore.saveUserSolutionForLesson(
        chapterIndex,
        stepIndex,
        newCode
      );
    }
  };

  useEffect(() => {
    if (solutionRequested && activeView !== 'solution') {
      setActiveView('solution');
    }
    if (!solutionRequested && activeView === 'solution') {
      setActiveView('code');
    }
  }, [solutionRequested]);

  const isSolutionView = activeView === 'solution';
  const editorContent = isSolutionView
    ? JSON.stringify(codeFile.solution, null, 2)
    : codeString;

  return (
    <>
      <div className={styles.tabBar}>
        <button
          className={ctx(styles.tabButton, activeView === 'code' && styles.activeTab)}
          onClick={() => setActiveView('code')}
        >
          My Code
        </button>

        {solutionRequested && (
          <button
            className={ctx(styles.tabButton, activeView === 'solution' && styles.activeTab)}
            onClick={() => setActiveView('solution')}
          >
            Solution
          </button>
        )}
      </div>

      <div className={ctx(styles.codeEditor, GeistMono.className)}>
        <Editor
          language="json"
          value={editorContent}
          key={activeView}
          theme={colorMode === "light" ? "light" : "my-theme"}
          height="100%"
          onChange={handleCodeChange}
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            formatOnPaste: true,
            formatOnType: true,
            readOnly: isSolutionView,
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