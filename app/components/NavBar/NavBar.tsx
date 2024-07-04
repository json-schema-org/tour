"use client";

import React from "react";
import styles from "./NavBar.module.css";
import JSONSchemaIcon from "@/public/icons/json-schema-blue.png";
import JSONSchemaIconDark from "@/public/icons/json-schema-white.png";
import Image from "next/image";
import cx from "classnames";
import { outfitFont } from "@/app/styles/fonts";
import LeftArrow from "@/app/styles/icons/LeftArrow";
import FiChevronRight from "@/app/styles/icons/FiChevronRight";
import {
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Switch,
  useColorMode,
  useDisclosure,
} from "@chakra-ui/react";
import GithubIcon from "@/app/styles/icons/GithubIcon";
import MoonIcon from "@/app/styles/icons/MoonIcon";
import SettingsIcon from "@/app/styles/icons/SettingsIcon";
import OutlineMenuIcon from "@/app/styles/icons/OutlineMenuIcon";
import SunIcon from "@/app/styles/icons/BiSun";
import Link from "next/link";
import { useRouter } from "next/navigation";
import MdRestoreIcon from "@/app/styles/icons/MdRestore";
import SensorsIcon from "@/app/styles/icons/Sensors";
import OutlineDrawer from "../OutlineDrawer";
import { ContentOutline } from "@/lib/types";

function NavBarMenu() {
  const { colorMode } = useColorMode();
  const [collectTelemetry, setCollectTelemetry] = React.useState(false);

  return (
    <Menu closeOnSelect={false} gutter={4}>
      <MenuButton className={styles.menuButton}>
        <SettingsIcon colorMode={colorMode} />
      </MenuButton>
      <MenuList width={"min-content"} className={outfitFont.className}>
        <MenuItem
          display={"flex"}
          gap={"8px"}
          onClick={(e) => {
            e.preventDefault();
            setCollectTelemetry(!collectTelemetry);
          }}
        >
          <Flex dir="row" align="center" width={"max-content"} gap={"8px"}>
            <SensorsIcon colorMode={colorMode} />
            Telemetry data
            <div style={{ marginLeft: "16px" }}>
              <Switch size="sm" isChecked={collectTelemetry} />
            </div>
          </Flex>
        </MenuItem>
        <MenuItem display={"flex"} gap={"8px"} color={"red"}>
          <MdRestoreIcon />
          Reset progress
        </MenuItem>
      </MenuList>
    </Menu>
  );
}

export default function NavBar({
  chapterTitle,
  lessonTitle,
  backLink,
  chapterIndex,
  stepIndex,
  outline,
}: {
  chapterTitle: string;
  lessonTitle: string;
  backLink?: string;
  chapterIndex: number;
  stepIndex: number;
  outline: ContentOutline;
}) {
  const { colorMode, toggleColorMode } = useColorMode();
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const outlineBtnRef = React.useRef(null);
  return (
    <div className={styles.navBar}>
      <div className={styles.leftContentWrapper}>
        <Link className={styles.logoTitle} href="/">
          <Image
            src={colorMode == "light" ? JSONSchemaIcon : JSONSchemaIconDark}
            alt="JSON Schema Logo"
            width={40}
            height={40}
          />
          <div className={cx(styles.title, outfitFont.className)}>
            A Tour of JSON Schema
          </div>
        </Link>
        <div className={styles.contentNavigation}>
          <button
            className={styles.backBtn}
            onClick={() => {
              if (backLink) {
                router.push("/" + backLink);
              } else {
                router.push("/");
              }
            }}
          >
            <LeftArrow colorMode={colorMode} />
          </button>
          <Flex
            dir="row"
            align="center"
            gap={"8px"}
            onClick={onOpen}
            cursor={"pointer"}
          >
            <div className={styles.chapterTitle}>
              Chapter {chapterIndex + 1}: {chapterTitle}
            </div>
            <div className={styles.breadcrumbIcon}>
              <FiChevronRight colorMode={colorMode} />
            </div>
            <div className={styles.lessonTitle}>
              Lesson {stepIndex + 1}: {lessonTitle}
            </div>
          </Flex>
        </div>
      </div>
      <div className={styles.rightContentWrapper}>
        <Link href="https://github.com/json-schema-org/tour" target="_blank">
          <button className={styles.menuButton}>
            <GithubIcon colorMode={colorMode} />
          </button>
        </Link>
        <button className={styles.menuButton} onClick={toggleColorMode}>
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
          onClick={onOpen}
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
    </div>
  );
}
