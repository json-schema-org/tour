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
  const [topWidth, setTopWidth] = useState(400); // Initial width of the left div
  const dividerRef = useRef<HTMLDivElement>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef<HTMLDivElement | boolean>(false);

  const handleMouseDown = () => {
    isDraggingRef.current = true;
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  const handleMouseMove = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent> | MouseEvent,
  ) => {
    if (!isDraggingRef.current) return;

    const containerRect = containerRef.current!.getBoundingClientRect();
    const newTopWidth = e.clientY - containerRect.top;

    if (newTopWidth > 32) {
      setTopWidth(newTopWidth);
      localStorage.setItem("verticalTopHeight", String(newTopWidth));
    } else {
      localStorage.setItem("verticalTopHeight", String(containerRect.top));
      setTopWidth(containerRect.top);
    }
  };

  useEffect(() => {
    const topHeight = localStorage.getItem("verticalTopHeight");
    if (topHeight) {
      setTopWidth(Number(topHeight));
    }
  }, []);

  return (
    <div
      className={styles.codeEditorNOutput}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      ref={containerRef}
    >
      <Box
        flex={6}
        height={`${topWidth}px`}
        position={"relative"}
        className="top"
      >
        <CodeEditor
          codeString={codeString}
          setCodeString={setCodeString}
          codeFile={codeFile}
          dispatchOutput={dispatchOutput}
          nextStepPath={nextStepPath}
          stepIndex={stepIndex}
          chapterIndex={chapterIndex}
        />
      </Box>
      <div
        ref={dividerRef}
        className={styles.divider}
        onMouseDown={handleMouseDown}
      ></div>
      <div
        className={styles.outputWrapper}
        style={{ height: `calc(100% - ${topWidth}px - 6px)` }}
      >
        <Output outputResult={output} showSolution={showSolution} />
      </div>
    </div>
  );
}
