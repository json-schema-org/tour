import { Box, Collapse, useDisclosure } from "@chakra-ui/react";
import React from "react";

import { ChapterStep } from "@/lib/types";
import Link from "next/link";
import cx from "classnames";
import { contentManager } from "@/lib/contentManager";
import { useEffect } from "react";
import styles from "./ChapterItem.module.css";
import GoCheck from "@/app/styles/icons/GoCheck";
import { isStepCompleted } from "@/lib/client-functions";

function StepItem({
  step,
  index,
  isActive,
  activeStepIndex,
  isCompleted,
}: {
  step: ChapterStep;
  index: number;
  isActive: boolean;
  activeStepIndex: number;
  isCompleted: boolean;
}) {
  return (
    <Link
      href={("/" + contentManager.getPathWithPrefix(step.fullPath)) as string}
      key={step.title}
    >
      <li
        className={cx(
          styles.stepItem,
          isActive && activeStepIndex === index ? styles.activeStep : "",
          isCompleted && styles.completedStep,
        )}
      >
        {step.title}
      </li>
    </Link>
  );
}

export default function ChapterItem({
  index,
  isCompleted,
  isActive,
  title,
  steps,
  activeStepIndex,
}: {
  index: number;
  isCompleted: boolean;
  isActive: boolean;
  title: string;
  steps: ChapterStep[];
  activeStepIndex: number;
}) {
  const { isOpen, onToggle, onOpen } = useDisclosure();
  useEffect(() => {
    if (isActive) onOpen();
  }, [isActive, onOpen]);
  return (
    <li className={styles.chapterItem}>
      <button
        className={cx(
          styles.chapterItemWrapper,
          !isOpen && styles.closed,
          isCompleted && styles.completedChapterItemWrapper,
          isActive && styles.activeChapterItemWrapper,
        )}
        onClick={onToggle}
      >
        <div
          className={cx(
            styles.chapterItemNumber,
            isActive ? styles.active : styles.neutral,
          )}
        >
          {isCompleted ? (
            <GoCheck isActive={isActive} />
          ) : (
            <span>{index + 1}</span>
          )}
        </div>
        <div className={cx(styles.chapterTitleWrapper)}>
          <Box opacity={0.5}>Chapter {index + 1}</Box>
          <div>{title}</div>
        </div>
      </button>
      <Collapse in={isOpen} animateOpacity>
        {
          <ul>
            {steps.map((step, stepIndex) => (
              <StepItem
                step={step}
                index={stepIndex}
                isActive={isActive}
                key={step.title}
                isCompleted={isStepCompleted(index, stepIndex)}
                activeStepIndex={activeStepIndex}
              />
            ))}
          </ul>
        }
      </Collapse>
    </li>
  );
}
