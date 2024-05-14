import { contentManager } from "@/lib/contentManager";
import { CodeFile } from "@/lib/types";
import fs from "fs";

type moduleExports = {
  exports: CodeFile;
};

export default function CodeEditor({ urlPath }: { urlPath: string }) {
  const folderName = contentManager.contentFolderName;
  const path = `./${folderName}/${urlPath}/${contentManager.codeFileName}`;
  const fileContent = fs.readFileSync(path, "utf-8");
  const dynmicFunction = new Function("module", fileContent);
  const moduleExports: {} | moduleExports = {};
  dynmicFunction(moduleExports);
  const { exports } = moduleExports as moduleExports;
  const code = exports.code;

  console.log();
  //   const ast = parser.parse(fileContent, {
  //     sourceType: "module",
  //     plugins: ["jsx"],
  //   });

  return <div>{JSON.stringify(code, null, 2)}</div>;
}
