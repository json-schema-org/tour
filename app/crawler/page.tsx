import React from "react";
import { listFiles, traverseDirectory } from "@/lib/fileUtils";

export default function Crawler() {
  const path = "./content";
  const files = traverseDirectory(path);
  console.log(files[0].children[0].children);
  return <div>Crawler</div>;
}
