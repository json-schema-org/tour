"use client";
import React, { useReducer, useState } from "react";
import CodeEditor from "../components/CodeEditor/CodeEditor";
import EditorNOutput from "../components/EditorNOutput/EditorNOutput";
import styles from "./page.module.css";
import { Box, Flex } from "@chakra-ui/react";
import Output from "../components/Output/Output";
import { outputReducer } from "@/lib/reducers";
import SmallBtn from "../components/SmallBtn/SmallBtn";
import { hyperjumpValidate } from "@/lib/validators";

function PlaygroundOutput() {
  return <div className={styles.playgroundOutput}></div>;
}

export default function Playground() {
  const [data, setData] = useState("{}");
  const [schema, setSchema] = useState("{}");
  const [output, dispatchOutput] = useReducer(outputReducer, {
    validityStatus: "neutral",
    errors: "",
    failedTestCases: [],
  });
  return (
    <div className={styles.playground}>
      <Flex flex={1} width={"100%"} direction={"column"}>
        Schema
        <CodeEditor code={schema} setCode={setSchema} />
      </Flex>
      <Flex flex={1} direction={"column"} gap={"8px"}>
        Data
        <Box flex={5}>
          <CodeEditor code={data} setCode={setData} />
        </Box>
        <SmallBtn variant="default">Validate</SmallBtn>
      </Flex>
    </div>
  );
}
