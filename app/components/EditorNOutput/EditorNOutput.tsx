import React from "react";
import CodeEditor from "../CodeEditor";
import styles from "./EditorNOutput.module.css";
import { Box } from "@chakra-ui/react";
import Output from "../Output";
import { CodeFile } from "@/lib/types";

export default function EditorNOutput({ codeFile }: { codeFile: CodeFile }) {
  return (
    <div className={styles.codeEditorNOutput}>
      <Box flex={7}>
        <CodeEditor code={codeFile.code} />
      </Box>
      <Box flex={3}>
        <Output />
      </Box>
    </div>
  );
}
