"use client";

import React, { useState, useRef, useEffect } from "react";
import styles from "@/app/content/[...markdownPath]/page.module.css";
import ContentViewer from "./ContentViewer";
import EditorNOutput from "./EditorNOutput";

interface ResizableContentProps {
  content: React.ReactNode;
  codeFile: any;
  nextStepPath: string | undefined;
  stepIndex: number;
  chapterIndex: number;
}

export default function ResizableContent({
  content,
  codeFile,
  nextStepPath,
  stepIndex,
  chapterIndex,
}: ResizableContentProps) {
  const [leftWidth, setLeftWidth] = useState(600);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef<boolean>(false);

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
    const newLeftWidth = e.clientX - containerRect.left;

    const minWidth = 300;
    const maxWidth = containerRect.width * 0.7;

    if (newLeftWidth >= minWidth && newLeftWidth <= maxWidth) {
      setLeftWidth(newLeftWidth);
      localStorage.setItem("horizontalLeftWidth", String(newLeftWidth));
    }
  };

  useEffect(() => {
    const savedWidth = localStorage.getItem("horizontalLeftWidth");
    if (savedWidth) {
      setLeftWidth(Number(savedWidth));
    }
  }, []);

  return (
    <div
      className={styles.mainArea}
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <div className={styles.leftPane} style={{ width: `${leftWidth}px` }}>
        <ContentViewer>{content}</ContentViewer>
      </div>
      <div className={styles.divider} onMouseDown={handleMouseDown} />
      <div className={styles.rightPane}>
        <EditorNOutput
          codeFile={codeFile}
          nextStepPath={nextStepPath}
          stepIndex={stepIndex}
          chapterIndex={chapterIndex}
        />
      </div>
    </div>
  );
}
