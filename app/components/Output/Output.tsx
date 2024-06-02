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
  let outputBodyContent;
  if (outputResult.validityStatus == "neutral") {
    outputBodyContent = "Please click the validate button to see the output";
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
    <div className={classnames(styles.output)} style={{ flex: flex }}>
      <div className={styles.header}>
        <div className={styles.title}>Output </div>
      </div>
      <div className={classnames(styles.outputBody)}>{outputBodyContent}</div>
    </div>
  );
}

export default Output;
