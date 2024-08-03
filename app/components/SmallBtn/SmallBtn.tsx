import { Button, Tooltip } from "@chakra-ui/react";

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
        onClick={onClick}
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
