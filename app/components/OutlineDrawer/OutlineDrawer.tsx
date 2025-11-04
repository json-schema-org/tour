import React, { useEffect } from "react";
import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerCloseButton,
  DrawerBody,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import styles from "./OutlineDrawer.module.css";
import { ContentOutline } from "@/lib/types";
import ChapterItem from "../ChapterItem";
import { isChapterCompleted } from "@/lib/client-functions";
import Link from "next/link";
import CertificateButton from "../CertificateButton/CertificateButton";
import { useSearch } from "@/app/utils/hooks";
import { SearchIcon } from "@chakra-ui/icons";

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
  /**
   * Initialize the search hook
   * 
   * This hook provides:
   * - searchQuery: Current search string
   * - setSearchQuery: Function to update search
   * - filteredOutline: Filtered chapters based on search
   */
  const { searchQuery, setSearchQuery, filteredOutline } = useSearch(outline);

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
          <DrawerHeader
            display={"flex"}
            justifyContent={"space-between"}
            paddingRight={12}
          >
            Outline
            <CertificateButton />
          </DrawerHeader>

          <DrawerBody>
            {/* Search Input Section */}
            {/* 
              Added to allow users to search through chapters and lessons
              This helps users quickly find specific topics without scrolling
            */}
            <InputGroup mb={4} size="md">
              <InputLeftElement pointerEvents="none">
                <SearchIcon color="gray.400" />
              </InputLeftElement>
              <Input
                placeholder="Search chapters and lessons..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                borderRadius="md"
                focusBorderColor="blue.400"
                _placeholder={{ color: "gray.400" }}
              />
            </InputGroup>

            <nav>
              {/* 
                Display filtered outline instead of original outline
                When search is active, only matching chapters/lessons are shown
              */}
              {filteredOutline.length > 0 ? (
                <ul className={styles.chapterItemsList}>
                  {filteredOutline.map((item, index) => {
                    // Find the original chapter index from the full outline
                    // This is needed to maintain correct chapter numbering and completion status
                    const originalIndex = outline.findIndex(
                      (chapter) => chapter.folderName === item.folderName
                    );
                    
                    return (
                      <ChapterItem
                        isActive={originalIndex === activeChapterIndex}
                        isCompleted={isChapterCompleted(
                          originalIndex,
                          item.steps.length
                        )}
                        index={originalIndex}
                        key={item.title}
                        title={item.title}
                        steps={item.steps}
                        activeStepIndex={activeStepIndex}
                        onClose={onClose}
                      />
                    );
                  })}
                </ul>
              ) : (
                /* 
                  No results message
                  Shown when search query doesn't match any chapters or lessons
                */
                <div className={styles.noResults}>
                  <p>No matching chapters or lessons found.</p>
                  <p>Try a different search term.</p>
                </div>
              )}
            </nav>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
