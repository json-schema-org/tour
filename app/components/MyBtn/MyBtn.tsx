import { Button, Tooltip } from "@chakra-ui/react";
import { sendGAEvent } from "@next/third-parties/google";
import styles from "./MyBtn.module.css";

export default function MyBtn({
  children,
  variant,
  onClick,
  isDisabled,
  tooltip,
  size = "xs",
}: {
  children: React.ReactNode;
  variant: "success" | "error" | "default";
  onClick: () => void;
  isDisabled?: boolean;
  tooltip?: string;
  size?: "xs" | "sm" | "md" | "lg";
}) {
  return (
    <Tooltip label={tooltip} aria-label={tooltip} placement="top">
      <Button
        variant={variant}
        onClick={() => {
          onClick();
          sendGAEvent("event", "buttonClicked", {
            value: children?.toString(),
          });
        }}
        size={size}
        width={"min-content"}
        textTransform={"uppercase"}
        isDisabled={isDisabled}
        fontWeight={"bold"}
        className={styles.myBtn}
      >
        {children}
      </Button>
    </Tooltip>
  );
}
