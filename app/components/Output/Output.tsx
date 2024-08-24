import React, { useState } from "react";
import styles from "./Output.module.css";
import classnames from "classnames";
import { OutputResult } from "@/lib/types";
import FailedTestCasesWindow from "../TestCaseWindow/TestCaseWindow";
import MyBtn from "../MyBtn";
import { InvalidSchemaError } from "@hyperjump/json-schema/draft-2020-12";
import { schemaUrl } from "@/lib/validators";
import KeyBindings from "../KeyBindings/KeyBindings";
import { Flex, ListItem, UnorderedList } from "@chakra-ui/react";
import CodeSnippet from "../CodeSnippet/CodeSnippet";
import Link from "next/link";
import { sendGAEvent } from "@next/third-parties/google";

const SchemaError = ({ schemaPath }: { schemaPath: string }) => {
  const errorTitle = "Invalid Type or Keyword";
  const JSONSchemaTypes = [
    "string",
    "number",
    "integer",
    "object",
    "array",
    "boolean",
    "null",
  ];
  const errorDetails = (
    <>
      You are using invalid type or keyword in the schema. The type should be
      one of the valid JSON Schema types. The valid types are:{" "}
      {JSONSchemaTypes.map((t) => (
        <>
          <CodeSnippet key={t}>{t}</CodeSnippet>
          {", "}
        </>
      ))}
    </>
  );
  const possibleFixes = [
    "Check that the type specified is one of the valid JSON Schema types",
    "Correct any typos in the type name",
    <>
      Ensure you are using valid keywords for the JSON Schema version you are
      using. You can view all the JSON Schema keywords for the latest version{" "}
      <Link
        href={"https://www.learnjsonschema.com/2020-12/"}
        target="_blank"
        style={{
          color: "hsl(var(--link-color))",
          textDecoration: "underline",
        }}
      >
        here
      </Link>
    </>,
  ];

  return (
    <div className={styles.schemaErrorContainer}>
      <div className={styles.invalid}>
        <b>Error: {errorTitle}</b>
      </div>
      <div>
        <b>Path:</b>{" "}
        <span style={{ color: "hsl(var(--link-color))" }}>{schemaPath}</span>
      </div>
      <div className={styles.schemaErrorDetails}>
        <b>Details:</b> {errorDetails}
      </div>
      <div style={{ marginTop: "10px" }}>
        <div>Possible Fixes:</div>
        <UnorderedList>
          {possibleFixes.map((fix, index) => (
            <ListItem key={index}>{fix}</ListItem>
          ))}
        </UnorderedList>
      </div>
    </div>
  );
};

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
        <MyBtn variant="default" onClick={() => {}}>
          validate
        </MyBtn>{" "}
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
      <div>
        {(outputResult.errors as InvalidSchemaError).output.errors && (
          <SchemaError
            schemaPath={(
              outputResult.errors as InvalidSchemaError
            ).output.errors![0].instanceLocation.replace(schemaUrl, "")}
          />
        )}
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
                onClick={() => {
                  showSolution();
                  sendGAEvent("event", "buttonClicked", {
                    value: "View Solution",
                  });
                }}
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
