import React, { useEffect } from "react";
import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerCloseButton,
  DrawerBody,
} from "@chakra-ui/react";
import styles from "./OutlineDrawer.module.css";
import { ContentOutline } from "@/lib/types";
import ChapterItem from "../ChapterItem";
import { isChapterCompleted } from "@/lib/client-functions";

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
                    isActive={index === activeChapterIndex}
                    isCompleted={isChapterCompleted(index, item.steps.length)}
                    index={index}
                    key={item.title}
                    title={item.title}
                    steps={item.steps}
                    activeStepIndex={activeStepIndex}
                    onClose={onClose}
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
