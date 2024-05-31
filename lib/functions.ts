import { CustomMDX } from "@/app/components/mdx";
import matter from "gray-matter";
import fs from "fs";
import { CodeFile, Metadata } from "./types";
import { hyperjumpValidate, schemaSafeValidate } from "./validators";
import { OutputUnit } from "@hyperjump/json-schema/draft-2020-12";

export function parseMdxFile(fullFilePath: string) {
  const file = fs.readFileSync(fullFilePath, "utf-8");

  const { content, data } = matter(file);
  const Page = () => CustomMDX({ source: content });

  return { Page, metadata: data as Metadata };
}

export async function validateCode(
  codeString: string,
  codeFile: CodeFile,
  setOutput: (output: any) => void
) {
  const testCases = codeFile.testCases;
  try {
    const schemaCode = JSON.parse(codeString);
    testCases.forEach((dataTestCase, i) => {
      const validationResult = schemaSafeValidate(
        dataTestCase.input,
        schemaCode
      );

      const failedTestCase = [];

      if (validationResult.valid !== dataTestCase.expected) {
        failedTestCase.push(i);
      }
    });
  } catch (e) {
    setOutput((e as Error).message);
  }
}
