import { useEffect, useState } from "react";
import { Monaco } from "@monaco-editor/react";
import { sendGAEvent } from "@next/third-parties/google";
import { useUserSolutionStore } from "@/lib/stores";
import { CodeFile } from "@/lib/types";
import { OutputReducerAction } from "@/lib/reducers";
import {
  restorePreviousValidation,
  hasValidationResult,
} from "@/lib/client-functions";

/**
 * Hook to configure Monaco editor theme based on color mode
 * Applies custom dark theme or light theme to the editor
 */
export const useEditorTheme = (
  monaco: Monaco | null,
  colorMode: "dark" | "light",
) => {
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

/**
 * Hook to handle keyboard shortcuts for validation
 * Triggers validation when Shift+Enter is pressed
 */
export const useValidationShortcut = (
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

/**
 * Hook to persist user code in localStorage across sessions
 * Loads saved code on mount and saves changes automatically
 */
export const useCodePersistence = (
  chapterIndex: number,
  stepIndex: number,
  codeString: string,
  setCodeString: (value: string) => void,
  codeFile: CodeFile,
) => {
  const userSolutionStore = useUserSolutionStore();

  // Load saved code on mount or lesson change
  useEffect(() => {
    const savedCode = userSolutionStore.getSavedUserSolutionByLesson(
      chapterIndex,
      stepIndex,
    );
    if (savedCode && savedCode !== codeString) {
      setCodeString(savedCode);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chapterIndex, stepIndex]);

  // Save code changes to localStorage
  useEffect(() => {
    userSolutionStore.saveUserSolutionForLesson(
      chapterIndex,
      stepIndex,
      codeString,
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [codeString, chapterIndex, stepIndex]);

  // Initialize with default code if no saved solutions exist
  useEffect(() => {
    if (Object.keys(userSolutionStore.userSolutionsByLesson).length === 0) {
      setCodeString(JSON.stringify(codeFile.code, null, 2));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userSolutionStore]);
};

/**
 * Hook to restore previous validation results when revisiting a lesson
 * Automatically loads and displays saved validation state from localStorage
 * Returns isRestored flag to show restoration status to user
 */
export const useValidationRestore = (
  chapterIndex: number,
  stepIndex: number,
  dispatchOutput: React.Dispatch<OutputReducerAction>,
  setCodeString: (value: string) => void,
) => {
  const [isRestored, setIsRestored] = useState(false);

  useEffect(() => {
    // Check if previous validation exists before restoring
    if (!isRestored && hasValidationResult(chapterIndex, stepIndex)) {
      try {
        const { restored } = restorePreviousValidation(
          chapterIndex,
          stepIndex,
          dispatchOutput,
          setCodeString,
        );
        if (restored) {
          setIsRestored(true);
          console.log(
            "✅ Previous validation restored for lesson:",
            chapterIndex,
            stepIndex,
          );
        }
      } catch (error) {
        console.error("Failed to restore validation:", error);
      }
    }
  }, [chapterIndex, stepIndex, isRestored, dispatchOutput, setCodeString]);

  return { isRestored };
};
