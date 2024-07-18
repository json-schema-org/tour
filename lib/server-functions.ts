import { CustomMDX } from "@/app/components/Mdx";
import matter from "gray-matter";
import fs from "fs";
import typescript from "typescript";
import { contentManager } from "./contentManager";

import { CodeFileExports, Metadata } from "./types";

export function parseLessonFolder(fullFilePath: string, codePath: string) {
  const file = fs.readFileSync(fullFilePath, "utf-8");

  const { content, data } = matter(file);
  const Page = () => CustomMDX({ source: content });

  const codeFile = getCodeFileExports(codePath);

  return { Page, metadata: data as Metadata, codeFile };
}

function transpileTypeScriptToJavaScript(tsCode: string) {
  const result = typescript.transpileModule(tsCode, {
    compilerOptions: { module: typescript.ModuleKind.CommonJS },
  });
  return result.outputText;
}

export function getCodeFileExports(fullFilePath: string) {
  const fileContent = fs.readFileSync(fullFilePath, "utf-8");
  const dynmicFunction = new Function(
    "module",
    transpileTypeScriptToJavaScript(fileContent)
  );
  const moduleExports: {} | CodeFileExports = {};
  dynmicFunction(moduleExports);

  return (moduleExports as CodeFileExports).exports;
}
