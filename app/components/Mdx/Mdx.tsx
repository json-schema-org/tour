import { MDXRemote, MDXRemoteProps } from "next-mdx-remote/rsc";
import rehypeMdxCodeProps from "rehype-mdx-code-props";
import { MDXComponents } from "mdx/types";
import CodeSnippet from "../CodeSnippet/CodeSnippet";
import InfoBox from "../InfoBox";
import GoodToKnowBox from "../GoodToKnowBox";
import rehypeExternalLinks from "rehype-external-links";
import styles from "./Mdx.module.css";
import SideEditorLink from "../SideEditorLink";

function createHeading(level: number): any {
  if (level < 1 || level > 6) {
    throw new Error("Invalid heading level");
  }

  return function HeadingComponent({
    children,
  }: {
    children: React.ReactNode;
  }) {
    const Tag = (`h${level}` as keyof JSX.IntrinsicElements) as any;
    return (
      <Tag className={styles.heading} style={{ lineHeight: "1.1" }}>
        {children}
      </Tag>
    );
  };
}

export const components: MDXComponents = {
  h1: createHeading(1),
  h2: createHeading(2),
  h3: createHeading(3),
  h4: createHeading(4),
  h5: createHeading(5),
  h6: createHeading(6),
  a: (props) => <a {...props} style={{ color: "hsl(var(--link-color))" }} />,
  ul: (props) => <ul {...props} />,
  ol: (props) => <ol {...props} />,
  li: (props) => (
    <li {...props} style={{ marginBlock: "0.5rem", color: "hsl(var(--text) / 0.75)" }} />
  ),
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
  GoodToKnowBox,
  CodeSnippet,
  SideEditorLink,
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
