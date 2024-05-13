"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@chakra-ui/react";

export default function NavigationBtn({
  path,
  direction,
}: {
  path: string | undefined;
  direction: "next" | "prev";
}) {
  const router = useRouter();
  return (
    <Button
      variant={"default"}
      size={"sm"}
      isDisabled={!path}
      onClick={() => {
        router.push("/" + path);
      }}
    >
      {direction === "next" ? "NEXT" : "PREVIOUS"}
    </Button>
  );
}
