"use client";

import React, { useState, useReducer, useRef, useEffect } from "react";
import CodeEditor from "../CodeEditor";
import styles from "./EditorNOutput.module.css";
import { Box } from "@chakra-ui/react";
import Output from "../Output";
import { CodeFile } from "@/lib/types";
import { outputReducer } from "@/lib/reducers";

export default function EditorNOutput({
  codeFile,
  nextStepPath,
  stepIndex,
  chapterIndex,
}: {
  codeFile: CodeFile;
  nextStepPath: string | undefined;
  stepIndex: number;
  chapterIndex: number;
}) {
  const [codeString, setCodeString] = useState(
    JSON.stringify(codeFile.code, null, 2),
  );

  const showSolution = () => {
    setCodeString(JSON.stringify(codeFile.solution, null, 2));
  };

  const [output, dispatchOutput] = useReducer(outputReducer, {
    validityStatus: "neutral",
    errors: "",
    testCaseResults: [],
  });
  const [topWidth, setTopWidth] = useState(380);
  const dividerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef<boolean>(false);

  const startDragging = () => {
    isDraggingRef.current = true;
  };

  const stopDragging = () => {
    isDraggingRef.current = false;
  };

  const updateHeight = (clientY: number) => {
    if (!isDraggingRef.current || !containerRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const newHeight = clientY - containerRect.top;
    const minHeight = 100;
    const maxHeight = containerRect.height - 100;

    const clampedHeight = Math.max(minHeight, Math.min(newHeight, maxHeight));
    setTopWidth(clampedHeight);
    localStorage.setItem("verticalTopHeight", String(clampedHeight));
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    updateHeight(e.clientY);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length > 0) {
      updateHeight(e.touches[0].clientY);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const topHeight = localStorage.getItem("verticalTopHeight");
      if (topHeight && Number(topHeight) > 100 && Number(topHeight) < window.innerHeight - 150) {
        setTopWidth(Number(topHeight));
      } else {
        setTopWidth(Math.max(250, Math.floor(window.innerHeight * 0.45)));
      }
    }
  }, []);

  return (
    <div
      className={styles.codeEditorNOutput}
      onMouseMove={handleMouseMove}
      onMouseUp={stopDragging}
      onMouseLeave={stopDragging}
      onTouchMove={handleTouchMove}
      onTouchEnd={stopDragging}
      ref={containerRef}
    >
      <Box
        height={`${topWidth}px`}
        position={"relative"}
        className="top"
        minHeight={"100px"}
        width={"100%"}
      >
        <CodeEditor
          codeString={codeString}
          setCodeString={setCodeString}
          codeFile={codeFile}
          dispatchOutput={dispatchOutput}
          nextStepPath={nextStepPath}
          stepIndex={stepIndex}
          chapterIndex={chapterIndex}
          outputResult={output}
        />
      </Box>
      <div
        ref={dividerRef}
        className={styles.divider}
        onMouseDown={startDragging}
        onTouchStart={startDragging}
      ></div>
      <div
        className={styles.outputWrapper}
        style={{ height: `calc(100% - ${topWidth}px - 8px)` }}
      >
        <Output outputResult={output} showSolution={showSolution} />
      </div>
    </div>
  );
}
