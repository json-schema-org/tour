import fs from "fs";
import { contentManager } from "@/lib/contentManager";

const outline = contentManager.generateOutline();
const outlineString = JSON.stringify(outline, null, 2);
fs.writeFileSync("./content/outline.json", outlineString);
