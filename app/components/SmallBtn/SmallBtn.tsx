import { Button } from "@chakra-ui/react";

export default function SmallBtn({
  children,
  variant,
  onClick,
}: {
  children: React.ReactNode;
  variant: "success" | "error" | "default";
  onClick: () => void;
}) {
  return (
    <Button
      variant={variant}
      onClick={onClick}
      size={"xs"}
      width={"min-content"}
      textTransform={"uppercase"}
    >
      {children}
    </Button>
  );
}
