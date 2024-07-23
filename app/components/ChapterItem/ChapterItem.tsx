import { Box, Collapse, useDisclosure } from "@chakra-ui/react";
import React from "react";

import { ChapterStep } from "@/lib/types";
import Link from "next/link";
import cx from "classnames";
import { contentManager } from "@/lib/contentManager";
import { useEffect } from "react";
import styles from "./ChapterItem.module.css";

function StepItem({
  step,
  index,
  state,
  activeStepIndex,
}: {
  step: ChapterStep;
  index: number;
  state: "active" | "completed" | "neutral";
  activeStepIndex: number;
}) {
  return (
    <Link
      href={("/" + contentManager.getPathWithPrefix(step.fullPath)) as string}
      key={step.title}
    >
      <li
        className={cx(
          styles.stepItem,
          state === "active" && activeStepIndex === index
            ? styles.activeStep
            : ""
        )}
      >
        {step.title}
      </li>
    </Link>
  );
}

export default function ChapterItem({
  index,
  state,
  title,
  steps,
  activeStepIndex,
}: {
  index: number;
  state: "active" | "completed" | "neutral";
  title: string;
  steps: ChapterStep[];
  activeStepIndex: number;
}) {
  const { isOpen, onToggle, onOpen } = useDisclosure();
  useEffect(() => {
    if (state === "active") onOpen();
  }, [state]);
  return (
    <li className={styles.chapterItem}>
      <button className={styles.chapterItemWrapper} onClick={onToggle}>
        <div className={cx(styles.chapterItemNumber, styles[state])}>
          <span>{index + 1}</span>
        </div>
        <div className={styles.chapterTitleWrapper}>
          <Box opacity={0.5}>Chapter {index + 1}</Box>
          <div>{title}</div>
        </div>
      </button>
      <Collapse in={isOpen} animateOpacity>
        {
          <ul>
            {steps.map((step, index) => (
              <StepItem
                step={step}
                index={index}
                state={state}
                key={step.title}
                activeStepIndex={activeStepIndex}
              />
            ))}
          </ul>
        }
      </Collapse>
    </li>
  );
}
