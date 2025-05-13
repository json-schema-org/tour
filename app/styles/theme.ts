import { extendTheme } from "@chakra-ui/react";

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
      color: "hsl(var(--success))",
      borderColor: "hsl(var(--success))",
      borderWidth: "1px",
      _disabled: {
        color: "hsl(var(--success) / 0.6)",
      },
      _hover: {
        bg: "hsl(var(--success))",
        color: "black",
        "& svg path": {
          fill: "black",
        },
        _disabled: {
          color: "hsl(var(--success) / 0.4)",
        },
      },
      _active: {
        bg: "hsl(var(--success))",
      },
    },
    error: {
      color: "hsl(var(--error))",
      borderColor: "hsl(var(--error))",
      borderWidth: "1px",
      _disabled: {
        color: "hsl(var(--error) / 0.6)",
      },
      _hover: {
        bg: "hsl(var(--error))",
        color: "white",
        _disabled: {
          color: "hsl(var(--error) / 0.4)",
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

const Tooltip = {
  baseStyle: {
    bg: "hsl(var(--background))",
    color: "hsl(var(--text) )",
    border: "1px solid hsl(var(--text) / 0.4)",
    borderRadius: "6px",
  },
};

const Popover = {
  baseStyle: {
    body: {
      bg: "hsl(var(--background))",
      borderBottomLeftRadius: "16px",
      borderBottomRightRadius: "16px",
    },
    header: {
      bg: "hsl(var(--background))",
      borderTopLeftRadius: "16px",
      borderTopRightRadius: "16px",
    },
    content: {
      borderRadius: "16px",
    },
  },
};

const Modal = {
  baseStyle: {
    dialog: {
      bg: "hsl(var(--background))",
      color: "hsl(var(--text))",
      borderRadius: "16px",
    },
  },
};

export const theme = extendTheme({
  config: {
    initialColorMode: "light",
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
  components: { Button, Menu, Switch, Drawer, Tooltip, Popover, Modal },
  fonts: {},
});
