import SyntaxHighlighter from "react-syntax-highlighter";
import { tomorrow } from "react-syntax-highlighter/dist/esm/styles/hljs";
import styles from "./CodeSnippet.module.css";

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
  if ((children.match(/\n/g) || []).length === 0) {
    return <span className={styles.inlineCode}>{children}</span>;
  }
  if (children[children.length - 1] === "\n") children = children.slice(0, -1);
  // remove the last \n from children

  if (highlightLineStart && !highlightLineEnd) {
    highlightLineEnd = highlightLineStart;
  }

  return (
    <SyntaxHighlighter
      language="javascript"
      style={tomorrow}
      className={styles.codeSnippet}
      showLineNumbers={showLineNumbers}
      wrapLines={true}
      wrapLongLines={true}
      startingLineNumber={startingLineNumber}
      lineProps={(lineNumber) => {
        let style = {};
        if (
          highlightLineStart &&
          highlightLineEnd &&
          lineNumber >= highlightLineStart &&
          lineNumber <= highlightLineEnd
        ) {
          style = {
            backgroundColor: "#00ff0023",
            borderLeft: "2px solid #0aff0ad0",
          };
        }
        return { style };
      }}
    >
      {children}
    </SyntaxHighlighter>
  );
}
