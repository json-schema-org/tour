import React, { useState } from "react";
import styles from "./Output.module.css";
import classnames from "classnames";
import { OutputResult } from "@/lib/types";
import FailedTestCasesWindow from "../TestCaseWindow/TestCaseWindow";
import SmallBtn from "../SmallBtn/SmallBtn";
import { InvalidSchemaError } from "@hyperjump/json-schema/draft-2020-12";
import { schemaUrl } from "@/lib/validators";
import KeyBindings from "../KeyBindings/KeyBindings";
import { Flex } from "@chakra-ui/react";

function Output({
  outputResult,
  showSolution,
}: {
  outputResult: OutputResult;
  showSolution: () => void;
}) {
  let outputBodyContent;

  if (outputResult.validityStatus == "neutral") {
    outputBodyContent = (
      <Flex dir="row" gap={1} paddingTop={2}>
        {" "}
        Please click the{" "}
        <SmallBtn variant="default" onClick={() => {}}>
          validate
        </SmallBtn>{" "}
        button or use <KeyBindings keys={["Shift", "Enter"]} /> to view the
        output
      </Flex>
    );
  } else if (outputResult.validityStatus == "valid") {
    outputBodyContent = (
      <div className={styles.valid}>
        <b className={styles.validMessage}>Valid Schema!</b>
        <span className={styles.validSmallMessage}>
          Let&apos;s move on to the next step
        </span>
      </div>
    );
  } else if (outputResult.validityStatus == "syntaxError") {
    outputBodyContent = (
      <div className={styles.invalid}>
        <b>Syntax Error:</b> <code>{outputResult.errors as string}</code>
      </div>
    );
  } else if (outputResult.validityStatus == "invalidSchema") {
    outputBodyContent = (
      <div className={styles.invalid}>
        <b>Invalid Schema:</b>{" "}
        <code>
          {(outputResult.errors as InvalidSchemaError).output.errors &&
            (
              outputResult.errors as InvalidSchemaError
            ).output.errors![0].instanceLocation.replace(schemaUrl, "")}
        </code>
      </div>
    );
  } else {
    outputBodyContent = (
      <FailedTestCasesWindow
        testCaseResult={outputResult.testCaseResults!}
        totalTestCases={outputResult.totalTestCases!}
      />
    );
  }

  return (
    <>
      <div className={styles.header}>
        <div className={styles.title}>Output </div>
      </div>

      <div className={classnames(styles.outputBody)}>
        {outputBodyContent}
        {outputResult.validityStatus !== "neutral" &&
          outputResult.validityStatus !== "valid" && (
            <div className={styles.footer}>
              Stuck?{" "}
              <button
                onClick={showSolution}
                style={{
                  color: "hsl(var(--link-color))",
                  textDecoration: "underline",
                }}
              >
                View Solution
              </button>
            </div>
          )}
      </div>
    </>
  );
}

export default Output;
