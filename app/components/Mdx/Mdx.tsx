import { MDXRemote, MDXRemoteProps } from "next-mdx-remote/rsc";
import {
  As,
  Heading,
  Link,
  ListItem,
  OrderedList,
  UnorderedList,
} from "@chakra-ui/react";
import rehypeMdxCodeProps from "rehype-mdx-code-props";
import { MDXComponents } from "mdx/types";
import CodeSnippet from "../CodeSnippet/CodeSnippet";
import InfoBox from "../InfoBox";
import GoodToKnowBox from "../GoodToKnowBox/GoodToKnowBox";
import rehypeExternalLinks from "rehype-external-links";
import styles from "./Mdx.module.css";

function createHeading(level: number): any {
  const headingSizes: {
    [key: number]: string;
  } = {
    1: "xl",
    2: "lg",
    3: "md",
    4: "sm",
    5: "xs",
    6: "xs",
  };
  if (level < 1 || level > 6) {
    throw new Error("Invalid heading level");
  }

  return function HeadingComponent({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
      <Heading
        as={`h${level}` as As}
        size={headingSizes[level]}
        lineHeight={"tallest"}
        letterSpacing={level <= 2 ? "tighter" : ""}
        className={styles.heading}
      >
        {children}
      </Heading>
    );
  };
}

export const components: MDXComponents = {
  // chakra-ui overrides heading styles so we need to use the Heading component
  // see https://github.com/chakra-ui/chakra-ui/issues/107 for more info

  h1: createHeading(1),
  h2: createHeading(2),
  h3: createHeading(3),
  h4: createHeading(4),
  h5: createHeading(5),
  h6: createHeading(6),
  a: (props) => <Link {...props} style={{ color: "hsl(var(--link-color))" }} />,
  ul: (props) => <UnorderedList {...props} />,
  ol: (props) => <OrderedList {...props} />,
  li: (props) => <ListItem {...props} marginBlock={"0.5rem"} />,
  code: (props: any) => <CodeSnippet {...props} />,
  p: (props) => (
    <p
      {...props}
      style={{ marginBlock: "0.5rem", color: "hsl(var(--text) / 0.75)" }}
    />
  ),
  blockquote: (props: any) => <InfoBox {...props} />,
  strong: (props) => (
    <strong {...props} style={{ color: "hsl(var(--text))" }} />
  ),
};

const customComponents = {
  InfoBox,
  GoodToKnowBox,
  CodeSnippet,
};
export function CustomMDX(props: MDXRemoteProps) {
  return (
    <MDXRemote
      options={{
        mdxOptions: {
          rehypePlugins: [
            [rehypeMdxCodeProps, { tagName: "code" }],
            [rehypeExternalLinks, { target: "_blank" }] as any,
          ],
        },
      }}
      components={{
        ...components,
        ...(props.components || {}),
        ...customComponents,
      }}
      {...props}
    />
  );
}
