"use client";

import React, { useEffect, useState } from "react";
import styles from "./NavBar.module.css";
import JSONSchemaIcon from "@/public/icons/json-schema-blue.png";
import JSONSchemaIconDark from "@/public/icons/json-schema-white.png";
import Image from "next/image";
import cx from "classnames";
import { outfitFont } from "@/app/styles/fonts";
import LeftArrow from "@/app/styles/icons/LeftArrow";
import FiChevronRight from "@/app/styles/icons/FiChevronRight";
import { Box, Flex, useColorMode, useDisclosure } from "@chakra-ui/react";
import GithubIcon from "@/app/styles/icons/GithubIcon";
import MoonIcon from "@/app/styles/icons/MoonIcon";

import OutlineMenuIcon from "@/app/styles/icons/OutlineMenuIcon";
import SunIcon from "@/app/styles/icons/BiSun";
import Link from "next/link";
import { useRouter } from "next/navigation";

import OutlineDrawer from "../OutlineDrawer";
import { contentManager } from "@/lib/contentManager";
import Progressbar from "../Progressbar";
import NavBarMenu from "../NavBarMenus";
import { sendGAEvent } from "@next/third-parties/google";
import { setCheckpoint } from "@/lib/progressSaving";

export default function NavBar({ urlPath }: { urlPath: string }) {
  const {
    chapterIndex,
    chapterTitle,
    previousStepPath,
    stepIndex,
    stepTitle,
    totalSteps,
  } = contentManager.getPageMeta(urlPath);

  const outline = contentManager.getOutline();
  const { colorMode, toggleColorMode } = useColorMode();
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const outlineBtnRef = React.useRef(null);
  const [progress, setProgress] = useState(
    ((stepIndex + 1) / totalSteps) * 100,
  );

  useEffect(() => {
    const newProgress = ((stepIndex + 1) / totalSteps) * 100;

    setProgress(newProgress);
  }, [urlPath]);

  return (
    <div className={styles.navBar}>
      <div className={styles.leftContentWrapper}>
        <Link className={styles.logoTitle} href="/" onClick={() => {
          setCheckpoint("/")
        }}>
          <Image
            src={colorMode == "light" ? JSONSchemaIcon : JSONSchemaIconDark}
            alt="JSON Schema Logo"
            width={32}
            height={32}
          />
          <div className={cx(styles.title, outfitFont.className)}>
            A Tour of JSON Schema
          </div>
        </Link>
        <div className={styles.contentNavigation}>
          <button
            className={styles.backBtn}
            onClick={() => {
              sendGAEvent("event", "buttonClicked", {
                value: "back navigation",
              });
              if (previousStepPath) {
                router.push("/" + previousStepPath);
              } else {
                router.push("/");
                setCheckpoint("/")
              }
            }}
          >
            <LeftArrow colorMode={colorMode} />
          </button>
          <Flex
            dir="row"
            align="center"
            gap={"8px"}
            onClick={() => {
              onOpen();
              sendGAEvent("event", "buttonClicked", {
                value: "Outline Drawer (from breadcrumb)",
              });
            }}
            cursor={"pointer"}
          >
            <div className={styles.chapterTitle}>
              Chapter {chapterIndex + 1}: {chapterTitle}
            </div>
            <div className={styles.breadcrumbIcon}>
              <FiChevronRight colorMode={colorMode} />
            </div>
            <div className={styles.lessonTitle}>
              Lesson {stepIndex + 1}: {stepTitle}
            </div>
          </Flex>
        </div>
      </div>
      <div className={styles.rightContentWrapper}>
        <Link
          href="https://github.com/json-schema-org/tour"
          target="_blank"
          onClick={() => {
            sendGAEvent("event", "buttonClicked", {
              value: "Github Link",
            });
          }}
        >
          <button className={styles.menuButton}>
            <GithubIcon colorMode={colorMode} />
          </button>
        </Link>
        <button
          className={styles.menuButton}
          onClick={() => {
            toggleColorMode();
            sendGAEvent("event", "buttonClicked", {
              value: "Theme Toggle",
            });
          }}
        >
          {colorMode === "light" ? (
            <SunIcon colorMode={colorMode} />
          ) : (
            <MoonIcon colorMode={colorMode} />
          )}
        </button>
        {/* menu */}
        <NavBarMenu />
        <button
          className={styles.menuButton}
          onClick={() => {
            onOpen();
            sendGAEvent("event", "buttonClicked", {
              value: "Outline Drawer",
            });
          }}
          ref={outlineBtnRef}
        >
          <OutlineMenuIcon colorMode={colorMode} />
        </button>
        <OutlineDrawer
          btnRef={outlineBtnRef}
          isOpen={isOpen}
          onClose={onClose}
          outline={outline}
          activeChapterIndex={chapterIndex}
          activeStepIndex={stepIndex}
        />
      </div>
      <Box pos={"absolute"} width={"100%"} bottom={0} left={0}>
        <Progressbar progress={progress} />
      </Box>
    </div>
  );
}
