import {
  background,
  theme as chakraTheme,
  extendTheme,
} from "@chakra-ui/react";
import { config } from "process";

const Button = {
  variants: {
    default: {
      color: "white",
      bg: "hsl(var(--primary))",
      _hover: {
        bg: "hsl(var(--primary) / 0.8)",
        _disabled: {
          bg: "hsl(var(--primary) / 0.6)",
        },
      },
      _active: {
        bg: "hsl(var(--primary) / 0.6)",
      },
    },
    success: {
      color: "green",

      borderColor: "green",
      borderWidth: "1px",
      _disabled: {
        color: "green.700",
      },
      _hover: {
        bg: "green.100",
        _disabled: {
          color: "green.700",
        },
      },
      _active: {
        bg: "green.200",
      },
    },
    error: {
      color: "red",

      borderColor: "red",
      borderWidth: "1px",
      _disabled: {
        color: "red.700",
      },
      _hover: {
        bg: "red.100",
        _disabled: {
          color: "red.700",
        },
      },
      _active: {
        bg: "red.200",
      },
    },
  },
};

export const theme = extendTheme({
  config: {
    initialColorMode: "system",
    useSystemColorMode: false,
  },
  styles: {
    global: {
      body: {
        bg: "hsl(var(--background))",
        color: "hsl(var(--text))",
      },
    },
  },
  components: { Button },
  fonts: {},
});
