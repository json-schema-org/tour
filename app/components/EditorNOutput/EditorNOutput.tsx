"use client";

import React, { useState, useReducer } from "react";
import CodeEditor from "../CodeEditor";
import styles from "./EditorNOutput.module.css";
import { Box, Button, Flex } from "@chakra-ui/react";
import Output from "../Output";
import { CodeFile } from "@/lib/types";
import { validateCode } from "@/lib/client-functions";
import { outputReducer } from "@/lib/reducers";

function SmallBtn({
  children,
  variant,
  onClick,
}: {
  children: React.ReactNode;
  variant: "success" | "error" | "default";
  onClick: () => void;
}) {
  return (
    <Button
      className={styles.validateBtn}
      variant={variant}
      onClick={onClick}
      size={"xs"}
      width={"min-content"}
      textTransform={"uppercase"}
    >
      {children!.toString()}
    </Button>
  );
}

export default function EditorNOutput({ codeFile }: { codeFile: CodeFile }) {
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
      <Box flex={6}>
        <CodeEditor code={codeString} setCode={setCodeString} />
      </Box>
      <Flex alignSelf={"flex-start"} gap={"4px"}>
        <SmallBtn
          onClick={async () =>
            validateCode(codeString, codeFile, dispatchOutput)
          }
          variant={"default"}
        >
          Validate
        </SmallBtn>

        <SmallBtn
          onClick={() => {
            setCodeString(JSON.stringify(codeFile.solution, null, 2));
          }}
          variant={"success"}
        >
          View Solution
        </SmallBtn>

        <SmallBtn
          onClick={() => {
            setCodeString(JSON.stringify(codeFile.code, null, 2));
            dispatchOutput({ type: "RESET" });
          }}
          variant={"error"}
        >
          Reset
        </SmallBtn>
      </Flex>
      <Output outputResult={output} flex={4} />
    </div>
  );
}
