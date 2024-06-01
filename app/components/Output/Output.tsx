import React, { useState } from "react";
import styles from "./Output.module.css";
import classnames from "classnames";
import { OutputResult } from "@/lib/types";
import FailedTestCasesWindow from "../FailedTestCaseWindow/FailedTestCaseWindow";

function Output({
  outputResult,
  flex,
}: {
  outputResult: OutputResult;
  flex: number;
}) {
  let textColor;

  if (outputResult.validityStatus === "neutral") {
    textColor = "neutral";
  } else if (outputResult.validityStatus === "valid") {
    textColor = "valid";
  } else if (outputResult.validityStatus === "syntaxError") {
    textColor = "invalid";
  } else {
    // invalid
    textColor = "neutral";
  }
  let outputBodyContent;
  if (outputResult.validityStatus == "neutral") {
    outputBodyContent = "Please click the validate button to see the output";
  } else if (outputResult.validityStatus == "valid") {
    outputBodyContent = "The code is valid. Let's move on to the next step";
  } else if (outputResult.validityStatus == "syntaxError") {
    outputBodyContent = (
      <div>
        <b>Syntax Error:</b> <code>{outputResult.errors}</code>
      </div>
    );
  } else {
    outputBodyContent = (
      <FailedTestCasesWindow
        failedTestCases={outputResult.failedTestCases!}
        totalTestCases={outputResult.totalTestCases!}
      />
    );
    console.log(outputResult.failedTestCases);
  }

  return (
    <div
      className={classnames(styles.output, styles[textColor])}
      style={{ flex: flex }}
    >
      <div className={styles.header}>
        <div className={styles.title}>Output </div>
      </div>
      <div className={classnames(styles.outputBody)}>{outputBodyContent}</div>
    </div>
  );
}

export default Output;
