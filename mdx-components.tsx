import type { MDXComponents } from "mdx/types";
import { components as MDXComponentsModified } from "@/app/components/Mdx";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    // chakra-ui overrides heading styles so we need to use the Heading component
    // see https://github.com/chakra-ui/chakra-ui/issues/107 for more info
    ...MDXComponentsModified,
  };
}
