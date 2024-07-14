import {
  background,
  theme as chakraTheme,
  extendTheme,
} from "@chakra-ui/react";
import { it } from "node:test";
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
      color: "green.300",

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

const Menu = {
  baseStyle: {
    list: {
      bg: "hsl(var(--background))",
      color: "hsl(var(--text))",
      borderColor: "hsl(var(--border-color))",
      borderWidth: "1px",
      borderRadius: "8px",
      padding: "8px",
    },
    item: {
      bg: "hsl(var(--background))",
      color: "hsl(var(--text))",
      borderRadius: "8px",
      _hover: {
        bg: "hsl(var(--background2))",
      },
    },
  },
};

const Switch = {
  baseStyle: {
    track: {
      bg: "hsl(var(--primary) / 0.4)",
      _checked: {
        bg: "hsl(var(--primary) )",
      },
    },
    thumb: {
      bg: "hsl(var(--background))",
    },
  },
};

const Drawer = {
  baseStyle: {
    dialog: {
      bg: "hsl(var(--background))",
      color: "hsl(var(--text))",
      borderLeftColor: "hsl(var(--border-color))",
      borderLeftWidth: "1px",
      borderTopLeftRadius: "16px",
      borderBottomLeftRadius: "16px",
    },
    body: {
      paddingInline: "16px",
    },
    overlay: {
      backdropFilter: "blur(2px)",
    },
  },
};

export const theme = extendTheme({
  config: {
    initialColorMode: "system",
    useSystemColorMode: true,
  },
  styles: {
    global: {
      body: {
        bg: "hsl(var(--background))",
        color: "hsl(var(--text))",
      },
    },
  },
  components: { Button, Menu, Switch, Drawer },
  fonts: {},
});
