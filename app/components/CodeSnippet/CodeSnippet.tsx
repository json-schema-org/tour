import SyntaxHighlighter from "react-syntax-highlighter";
import { tomorrow } from "react-syntax-highlighter/dist/esm/styles/hljs";
import styles from "./CodeSnippet.module.css";

export default function CodeSnippet({ children }: { children: string }) {
  return (
    <SyntaxHighlighter
      language="javascript"
      style={tomorrow}
      className={styles.codeSnippet}
    >
      {children}
    </SyntaxHighlighter>
  );
}
