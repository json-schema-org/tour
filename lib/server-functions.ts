import { CustomMDX } from "@/app/components/mdx";
import matter from "gray-matter";
import fs from "fs";
import { Metadata } from "./types";

export function parseMdxFile(fullFilePath: string) {
  const file = fs.readFileSync(fullFilePath, "utf-8");

  const { content, data } = matter(file);
  const Page = () => CustomMDX({ source: content });

  return { Page, metadata: data as Metadata };
}
