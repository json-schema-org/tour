"use client";

import React, { useState, useReducer } from "react";
import CodeEditor from "../CodeEditor";
import styles from "./EditorNOutput.module.css";
import { Box } from "@chakra-ui/react";
import Output from "../Output";
import { CodeFile } from "@/lib/types";
import { outputReducer } from "@/lib/reducers";

export default function EditorNOutput({
  codeFile,
  nextStepPath,
}: {
  codeFile: CodeFile;
  nextStepPath: string | undefined;
}) {
  const [codeString, setCodeString] = useState(
    JSON.stringify(codeFile.code, null, 2)
  );

  const [output, dispatchOutput] = useReducer(outputReducer, {
    validityStatus: "neutral",
    errors: "",
    failedTestCases: [],
  });

  return (
    <div className={styles.codeEditorNOutput}>
      <Box flex={6} position={"relative"}>
        <CodeEditor
          codeString={codeString}
          setCodeString={setCodeString}
          codeFile={codeFile}
          dispatchOutput={dispatchOutput}
          nextStepPath={nextStepPath}
        />
      </Box>

      <Output outputResult={output} flex={4} />
    </div>
  );
}
