"use client";

import React, { useMemo, useState } from "react";
import CodeEditor from "../CodeEditor";
import styles from "./EditorNOutput.module.css";
import { Box, Button } from "@chakra-ui/react";
import Output from "../Output";
import { CodeFile } from "@/lib/types";

import { ajv } from "@/lib/validators";

export default function EditorNOutput({ codeFile }: { codeFile: CodeFile }) {
  const [codeString, setCodeString] = useState(
    JSON.stringify(codeFile.code, null, 2)
  );

  const [output, setOutput] = useState<string>("");
  const [isValid, setIsValid] = useState<boolean>(true);

  const validateCode = useMemo(() => {
    function validateCode() {
      const { errors, valid } = ajv(
        JSON.parse(codeString),
        codeFile.validationSchema
      );
      setIsValid(valid);
      if (valid) {
        setOutput("Code is valid");
      } else {
        setOutput(errors);
        console.log(errors);
      }
    }
    return validateCode;
  }, [codeString, codeFile.validationSchema]);

  return (
    <div className={styles.codeEditorNOutput}>
      <Box flex={6}>
        <CodeEditor code={codeString} setCode={setCodeString} />
      </Box>
      <Button
        className={styles.validateBtn}
        variant={"default"}
        onClick={validateCode}
        size={"xs"}
        width={"min-content"}
        alignSelf={"flex-end"}
        textTransform={"uppercase"}
      >
        Validate
      </Button>

      <Output isValid={isValid} flex={4}>
        {output}
      </Output>
    </div>
  );
}