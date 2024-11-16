"use client";

import { useRouter } from "next/navigation";
import { getCheckPoint } from "@/lib/progressSaving";
import styles from "./CheckpointRedirect.module.css"
import RightArrow from "@/app/styles/icons/RightArrow";

export default function CheckpointRedirect() {
  const router = useRouter();
  const checkpoint = getCheckPoint();

  const handleClick = () => {
    const checkpoint = getCheckPoint();
    if (checkpoint) {
      router.push(`/${checkpoint}`);
    }
  }

  return (
    <>
      {checkpoint && (
        <button className={styles.button} onClick={handleClick}>
          Continue
          <div className={styles.rightIcon}>
            <RightArrow />
          </div>
        </button>
      )}
    </>
  )

  return null;
}
