import { outfitFont } from "@/app/styles/fonts";
import MdRestoreIcon from "@/app/styles/icons/MdRestore";

import SettingsIcon from "@/app/styles/icons/SettingsIcon";
import {
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  useColorMode,
} from "@chakra-ui/react";
import React, { useState } from "react";
import navBarStyles from "../NavBar/NavBar.module.css";
import { sendGAEvent } from "@next/third-parties/google";

export default function NavBarMenu() {
  const { colorMode } = useColorMode();

  const [isCleared, setIsCleared] = useState(false);

  return (
    <Menu closeOnSelect={false} gutter={4}>
      <MenuButton
        className={navBarStyles.menuButton}
        onClick={() => {
          sendGAEvent("event", "buttonClicked", {
            value: "Settings",
          });
        }}
      >
        <SettingsIcon colorMode={colorMode} />
      </MenuButton>
      <MenuList width={"min-content"} className={outfitFont.className}>
        <Popover
          placement="left"
          gutter={12}
          onOpen={() => setIsCleared(false)}
        >
          <PopoverTrigger>
            <MenuItem display={"flex"} gap={"8px"} color={"hsl(var(--error))"}>
              <MdRestoreIcon />
              Reset progress
            </MenuItem>
          </PopoverTrigger>
          <PopoverContent
            rootProps={{
              style: {
                transform: "scale(0)",
              },
            }}
          >
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverHeader>Confirmation!</PopoverHeader>
            <PopoverBody>
              {isCleared
                ? "Your Progress is cleared"
                : "Are you sure you want to reset your progress?"}
              <Button
                colorScheme={isCleared ? "green" : "red"}
                backgroundColor={
                  isCleared ? "hsl(var(--success))" : "hsl(var(--error))"
                }
                size="sm"
                width={"100%"}
                mt={2}
                onClick={() => {
                  localStorage.removeItem("progress");
                  setIsCleared(true);
                }}
              >
                {isCleared ? "Done!" : "RESET"}
              </Button>
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </MenuList>
    </Menu>
  );
}
