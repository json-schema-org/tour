import React from "react";
import { listFiles, traverseDirectory } from "@/lib/fileUtils";
import { title } from "@/content/01-introduction/01-why-json-schema.mdx";
export default function Crawler() {
  const path = "./content";
  const files = traverseDirectory(path);
  console.log(files[0].children[0].children);
  return <div>{title}</div>;
}
