"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getCheckPoint } from "@/lib/progressSaving";

export default function CheckpointRedirect() {
  const router = useRouter();

  useEffect(() => {
    const checkpoint = getCheckPoint();
    if (checkpoint) {
      router.push(`/${checkpoint}`);
    }
  }, [router]);

  return null;
}
