"use client";

import { useRouter } from "next/navigation";
import { getCheckPoint } from "@/lib/progressSaving";
import styles from "./ContinueBtn.module.css";
import RightArrow from "@/app/styles/icons/RightArrow";
import { Button } from "@chakra-ui/react";
import { useState, useEffect } from "react";

export default function ContinueBtn() {
  const router = useRouter();
  const [checkpoint, setCheckpoint] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const savedCheckpoint = getCheckPoint();
    setCheckpoint(savedCheckpoint);
  }, []);

  const handleClick = () => {
    if (checkpoint) {
      router.push(`/${checkpoint}`);
    }
  };

  return (
    <>
      {isClient && checkpoint && (
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
