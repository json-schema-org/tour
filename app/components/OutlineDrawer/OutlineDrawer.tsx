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
import { contentManager } from "@/lib/contentManager";

function ChapterItem({
  index,
  state,
  title,
  steps,
  activeStepIndex,
  openChapterIndex,
  setOpenChapterIndex,
}: {
  index: number;
  state: "active" | "completed" | "neutral";
  title: string;
  steps: ChapterStep[];
  activeStepIndex: number;
  openChapterIndex: number;
  setOpenChapterIndex: (index: number) => void;
}) {
  const { isOpen, onToggle, onOpen, onClose } = useDisclosure();
  // useEffect(() => {
  //   if (state === "active") onOpen();
  // }, [state]);

  useEffect(() => {
    if (openChapterIndex === index) {
      onOpen();
    } else {
      onClose();
    }
  }, [openChapterIndex]);

  useEffect(() => {
    if (state === "active") {
      onOpen();
    } else {
      onClose();
    }
  }, [state]);
  return (
    <li className={styles.chapterItem}>
      <button
        className={styles.chapterItemWrapper}
        onClick={() => {
          setOpenChapterIndex(index);
        }}
      >
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
              <Link
                href={
                  ("/" +
                    contentManager.getPathWithPrefix(step.fullPath)) as string
                }
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
  const [openChapterIndex, setOpenChapterIndex] =
    React.useState<number>(activeChapterIndex);

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
                    openChapterIndex={openChapterIndex}
                    setOpenChapterIndex={setOpenChapterIndex}
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
