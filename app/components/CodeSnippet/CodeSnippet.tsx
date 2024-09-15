"use client";
import SyntaxHighlighter from "react-syntax-highlighter";
import {
  nightOwl,
  arduinoLight,
} from "react-syntax-highlighter/dist/esm/styles/hljs";
import styles from "./CodeSnippet.module.css";
import { CSSProperties, useState } from "react";
import { useColorMode, Tooltip } from "@chakra-ui/react";
import { CopyIcon, CheckIcon } from "@chakra-ui/icons";

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
  const [isCopied, setIsCopied] = useState(false);

  if ((children.match(/\n/g) || []).length === 0) {
    return <span className={styles.inlineCode}>{children}</span>;
  }
  if (children[children.length - 1] === "\n") children = children.slice(0, -1);
  // remove the last \n from children

  if (highlightLineStart && !highlightLineEnd) {
    highlightLineEnd = highlightLineStart;
  }

  return (
    <div className={styles.codeSnippetContainer}>
      <div
        className={styles.copyButton}
        onClick={() => {
          navigator.clipboard.writeText(children);
          setIsCopied(true);
          setTimeout(() => setIsCopied(false), 2500);
        }}
      >
        {isCopied ? (
          <Tooltip label="Copied!" aria-label="Copied!" placement="top">
            <CheckIcon />
          </Tooltip>
        ) : (
          <Tooltip label="Copy" aria-label="Copy" placement="top">
            <CopyIcon />
          </Tooltip>
        )}
      </div>
      <SyntaxHighlighter
        language="javascript"
        style={colorMode === "dark" ? nightOwl : arduinoLight}
        className={styles.codeSnippet}
        showLineNumbers={showLineNumbers}
        customStyle={{
          paddingInline: 0,
          paddingBlock: "10px",
          whiteSpace: "pre", // This ensures code is not unnecessarily wrapped
        }}
        wrapLines={false}  // Disable wrapping of lines
        wrapLongLines={false}  // Prevent tokens from being wrapped
        lineNumberStyle={{
          color: "hsl(var(--text) / 0.6)",
          paddingRight: "12px",
          minWidth: "4ch",
        }}
        startingLineNumber={startingLineNumber}
        lineProps={(lineNumber) => {
          let style: CSSProperties = {
            opacity: colorMode === "dark" ? 0.9 : 1,
            paddingRight: "16px",
            paddingLeft: "4px",
          };
          if (
            highlightLineStart &&
            highlightLineEnd &&
            lineNumber >= highlightLineStart &&
            lineNumber <= highlightLineEnd
          ) {
            style = {
              ...style,
              color: "hsl(var(--text) / 0.75)",
              backgroundColor: colorMode === "dark" ? "#18391faa" : "#e0fae37a",
              borderLeft: `2px solid ${
                colorMode === "dark" ? "#0aff0aa0" : "#14ab00a0"
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
