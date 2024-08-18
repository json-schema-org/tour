import { Button, Tooltip } from "@chakra-ui/react";
import { sendGAEvent } from "@next/third-parties/google";

export default function SmallBtn({
  children,
  variant,
  onClick,
  isDisabled,
  tooltip,
}: {
  children: React.ReactNode;
  variant: "success" | "error" | "default";
  onClick: () => void;
  isDisabled?: boolean;
  tooltip?: string;
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
        size={"xs"}
        width={"min-content"}
        textTransform={"uppercase"}
        isDisabled={isDisabled}
        fontWeight={"bold"}
      >
        {children}
      </Button>
    </Tooltip>
  );
}
