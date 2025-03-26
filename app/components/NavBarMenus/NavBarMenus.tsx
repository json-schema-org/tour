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
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger,
  useColorMode,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import styles from "./NavBar.module.css";
import { sendGAEvent } from "@next/third-parties/google";
import { useUserSolutionStore } from "@/lib/stores";

export default function NavBarMenu() {
  const { colorMode } = useColorMode();
  const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false);
  const toast = useToast();
  const userSolutionStore = useUserSolutionStore();

  return (
    <>
      <Menu closeOnSelect={false} gutter={4}>
        <MenuButton
          className={styles.menuButton}
          onClick={() =>
            sendGAEvent("event", "buttonClicked", { value: "Settings" })
          }
        >
          <SettingsIcon colorMode={colorMode} />
        </MenuButton>

        <MenuList className={`${outfitFont.className} ${styles.menuList}`}>
          <Popover
            placement="left"
            gutter={12}
            isOpen={confirmationDialogOpen}
            onClose={() => setConfirmationDialogOpen(false)}
          >
            <PopoverTrigger>
              <MenuItem
                className={styles.menuItem}
                onClick={() => setConfirmationDialogOpen(true)}
              >
                <MdRestoreIcon />
                Reset progress
              </MenuItem>
            </PopoverTrigger>

            {confirmationDialogOpen && (
              <PopoverContent
                className={`${styles.dialog} ${colorMode === "dark" ? styles.dark : styles.light}`}
              >
                <h1 className={styles.dialogTitle}>Confirmation</h1>
                <p className={styles.dialogText}>
                  Are you sure you want to reset your progress?
                </p>
                <PopoverCloseButton />
                <Button
                  colorScheme="red"
                  w="100%"
                  mt={2}
                  className={styles.resetButton}
                  onClick={() => {
                    if (localStorage.getItem("progress")) {
                      localStorage.removeItem("progress");
                    }
                    userSolutionStore.clearAllCode();
                    setConfirmationDialogOpen(false);
                    toast({
                      title: "Progress Cleared",
                      description: "Your progress has been cleared",
                      status: "success",
                      duration: 3000,
                      isClosable: true,
                    });
                  }}
                >
                  RESET
                </Button>

                <Button
                  colorScheme="gray"
                  w="100%"
                  mt={2}
                  onClick={() => setConfirmationDialogOpen(false)}
                  className={styles.cancelButton}
                >
                  CANCEL
                </Button>
              </PopoverContent>
            )}
          </Popover>
        </MenuList>
      </Menu>
    </>
  );
}
