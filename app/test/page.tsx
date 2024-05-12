import React from "react";
// import Page1, {
//   metadata,
// } from "@/content/01-introduction/01-why-json-schema.mdx";
import ContentManager from "@/lib/contentManager";
import { CustomMDX } from "../components/mdx";
import { MDXRemote } from "next-mdx-remote/rsc";

export default function Test() {
  const cm = new ContentManager();
  const { metadata, Page } = cm.parseMdxFile(
    "01-introduction/01-why-json-schema.mdx"
  );

  return (
    <div>
      <Page />
    </div>
  );
}
