import { Heading } from "@chakra-ui/react";
import type { MDXComponents } from "mdx/types";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    // chakra-ui overrides heading styles so we need to use the Heading component
    // see https://github.com/chakra-ui/chakra-ui/issues/107 for more info

    h1: ({ children }) => {
      return <Heading as="h1">{children}</Heading>;
    },
    h2: ({ children }) => {
      return (
        <Heading as="h2" size="lg">
          {children}
        </Heading>
      );
    },
    h3: ({ children }) => {
      return (
        <Heading as="h3" size="md">
          {children}
        </Heading>
      );
    },
    h4: ({ children }) => {
      return (
        <Heading as="h4" size="sm">
          {children}
        </Heading>
      );
    },
    h5: ({ children }) => {
      return (
        <Heading as="h5" size="xs">
          {children}
        </Heading>
      );
    },
  };
}
