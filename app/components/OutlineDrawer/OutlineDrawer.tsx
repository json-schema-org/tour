import React, { useEffect } from "react";
import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerCloseButton,
  DrawerBody,
  Box,
  Collapse,
  useDisclosure,
} from "@chakra-ui/react";
import styles from "./OutlineDrawer.module.css";

import { ChapterStep, ContentOutline } from "@/lib/types";
import Link from "next/link";
import cx from "classnames";

function ChapterItem({
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
  const { isOpen, onToggle } = useDisclosure();
  useEffect(() => {
    if (state === "active") onToggle();
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
              <li
                key={step.title}
                className={cx(
                  styles.stepItem,
                  state === "active" && activeStepIndex === index
                    ? styles.activeStep
                    : ""
                )}
              >
                <Link href={"/" + step.fullPath}>{step.title}</Link>
              </li>
            ))}
          </ul>
        }
      </Collapse>
    </li>
  );
}

export default function OutlineDrawer({
  isOpen,
  onClose,
  btnRef,
  outline,
  activeChapterIndex,
  activeStepIndex,
}: {
  isOpen: boolean;
  onClose: () => void;
  btnRef: React.RefObject<HTMLButtonElement>;
  outline: ContentOutline;
  activeChapterIndex: number;
  activeStepIndex: number;
}) {
  return (
    <>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
        size={"md"}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Outline</DrawerHeader>

          <DrawerBody>
            <nav>
              <ul className={styles.chapterItemsList}>
                {outline.map((item, index) => (
                  <ChapterItem
                    state={index === activeChapterIndex ? "active" : "neutral"}
                    index={index}
                    key={item.title}
                    title={item.title}
                    steps={item.steps}
                    activeStepIndex={activeStepIndex}
                  />
                ))}
              </ul>
            </nav>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
