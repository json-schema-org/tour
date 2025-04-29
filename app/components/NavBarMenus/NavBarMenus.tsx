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
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import navBarStyles from "../NavBar/NavBar.module.css";
import { sendGAEvent } from "@next/third-parties/google";
import { useUserSolutionStore } from "@/lib/stores";

export default function NavBarMenu() {
  const { colorMode } = useColorMode();

  const [isOpen, setIsOpen] = useState(false);

  const toast = useToast();

  const userSolutionStore = useUserSolutionStore();

  return (
    <Menu closeOnSelect={false} gutter={4}>
      <MenuButton
        className={navBarStyles.menuButton}
        onClick={() => {
          setIsOpen(false);
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
          onOpen={() => setIsOpen(true)}
          onClose={() => setIsOpen(false)}
          isOpen={isOpen}
          openDelay={0}
          closeDelay={1500}
          closeOnBlur={false}
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
                display: isOpen ? "inherit" : "none",
              },
            }}
          >
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverHeader>Confirmation!</PopoverHeader>
            <PopoverBody>
              Are you sure you want to reset your progress?
              <Button
                colorScheme="red"
                backgroundColor="hsl(var(--error))"
                size="sm"
                width={"100%"}
                mt={2}
                onClick={() => {
                  localStorage.removeItem("progress");
                  userSolutionStore.clearAllCode();
                  toast({
                    title: "Progress Cleared",
                    description: "Your progress has been cleared",
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                  });
                  setIsOpen(false);
                }}
              >
                RESET
              </Button>
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </MenuList>
    </Menu>
  );
}
