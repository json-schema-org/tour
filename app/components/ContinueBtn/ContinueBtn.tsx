"use client";

import { useRouter } from "next/navigation";
import { getCheckPoint } from "@/lib/progressSaving";
import styles from "./ContinueBtn.module.css";
import RightArrow from "@/app/styles/icons/RightArrow";
import { Button } from "@chakra-ui/react";

export default function ContinueBtn() {
  const router = useRouter();
  const checkpoint = getCheckPoint();

  const handleClick = () => {
    const checkpoint = getCheckPoint();
    if (checkpoint) {
      router.push(`/${checkpoint}`);
    }
  };

  return (
    <>
      {checkpoint && (
        <Button
          variant={"default"}
          onClick={handleClick}
          size={"sm"}
          className={styles.continueBtn}
        >
          Continue
          <div className={styles.rightIcon}>
            <RightArrow />
          </div>
        </Button>
      )}
    </>
  );

  return null;
}
