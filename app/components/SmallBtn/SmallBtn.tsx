import { Button } from "@chakra-ui/react";

export default function SmallBtn({
  children,
  variant,
  onClick,
  isDisabled,
}: {
  children: React.ReactNode;
  variant: "success" | "error" | "default";
  onClick: () => void;
  isDisabled?: boolean;
}) {
  return (
    <Button
      variant={variant}
      onClick={onClick}
      size={"xs"}
      width={"min-content"}
      textTransform={"uppercase"}
      isDisabled={isDisabled}
    >
      {children}
    </Button>
  );
}
