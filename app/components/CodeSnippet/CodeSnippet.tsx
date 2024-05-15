import SyntaxHighlighter from "react-syntax-highlighter";
import { tomorrow } from "react-syntax-highlighter/dist/esm/styles/hljs";
import styles from "./CodeSnippet.module.css";

export default function CodeSnippet({ children }: { children: string }) {
  // remove the last \n from children
  children = children.slice(0, -1);

  return (
    <SyntaxHighlighter
      language="javascript"
      style={tomorrow}
      className={styles.codeSnippet}
      showLineNumbers={true}
    >
      {children}
    </SyntaxHighlighter>
  );
}
