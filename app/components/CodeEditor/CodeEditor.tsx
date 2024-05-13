import { contentManager } from "@/lib/contentManager";
import fs from "fs";

export default function CodeEditor({ mdPath }: { mdPath: string }) {
  const folderName = contentManager.contentFolderName;
  const path = `./${folderName}/${mdPath}`.replace(".mdx", ".ts");
  console.log(path);
  const fileContent = fs.readFileSync(path, "utf-8");
  console.log(fileContent);
  const dynmicFunction = new Function("module", fileContent);
  const moduleExports = {};
  dynmicFunction(moduleExports);
  moduleExports.exports.validationLogicFunction();
  console.log(moduleExports);
  //   const ast = parser.parse(fileContent, {
  //     sourceType: "module",
  //     plugins: ["jsx"],
  //   });

  return <div>CodeEditor</div>;
}
