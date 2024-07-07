"use client";
import SyntaxHighlighter from "react-syntax-highlighter";
import {
  nightOwl,
  atelierCaveLight,
  arduinoLight,
  atelierEstuaryLight,
} from "react-syntax-highlighter/dist/esm/styles/hljs";
import styles from "./CodeSnippet.module.css";
import { CSSProperties } from "react";
import { useColorMode } from "@chakra-ui/react";

export default function CodeSnippet({
  children,
  highlightLineStart,
  highlightLineEnd,
  startingLineNumber,
  showLineNumbers = true,
}: {
  children: string;
  highlightLineStart?: number;
  highlightLineEnd?: number;
  startingLineNumber?: number;
  showLineNumbers?: boolean;
}) {
  const { colorMode } = useColorMode();

  if ((children.match(/\n/g) || []).length === 0) {
    return <span className={styles.inlineCode}>{children}</span>;
  }
  if (children[children.length - 1] === "\n") children = children.slice(0, -1);
  // remove the last \n from children

  if (highlightLineStart && !highlightLineEnd) {
    highlightLineEnd = highlightLineStart;
  }

  return (
    <div
      onCopy={(e) => {
        e.preventDefault();
        e.clipboardData.setData("text/plain", children);
      }}
    >
      <SyntaxHighlighter
        language="javascript"
        style={colorMode === "dark" ? nightOwl : arduinoLight}
        className={styles.codeSnippet}
        showLineNumbers={showLineNumbers}
        wrapLines={true}
        wrapLongLines={true}
        startingLineNumber={startingLineNumber}
        lineProps={(lineNumber) => {
          let style: CSSProperties = {
            color: "hsl(var(--text))",
            padding: " 0 2px",
          };
          if (
            highlightLineStart &&
            highlightLineEnd &&
            lineNumber >= highlightLineStart &&
            lineNumber <= highlightLineEnd
          ) {
            style = {
              ...style,
              backgroundColor: colorMode === "dark" ? "#18391f" : "#e0fae3",
              borderLeft: `2px solid ${
                colorMode === "dark" ? "#0aff0a50" : "#0aff0aa0"
              }`,
            };
          }
          return { style };
        }}
      >
        {children}
      </SyntaxHighlighter>
    </div>
  );
}
