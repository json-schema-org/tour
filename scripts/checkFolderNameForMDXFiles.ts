import chalk from "chalk";
import fs from "fs"
import path from "path"

const getTitleFromMDX = (filePath: string): string | null => {
  const content = fs.readFileSync(filePath, "utf-8");
  const titleMatch = content.match(/title:\s*(.+)/);
  if (titleMatch) {
    return titleMatch[1].trim();
  }
  return null;
}

const checkFolderAndTitle = (folderPath: string) => {
  const files = fs.readdirSync(folderPath);
  
  files.forEach(file => {
    const fullPath = path.join(folderPath, file);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      checkFolderAndTitle(fullPath);
    } else if (file.endsWith('.mdx')) {
      const title = getTitleFromMDX(fullPath);
      const folderName = path.basename(folderPath).slice(3);
      const words = title?.split(" ") || [];
      let modifiedTitle = words.join("-");

      if (title) {
        if (folderName !== modifiedTitle) {
          const parentDir = path.dirname(folderPath);
          const newFolderPath = path.join(parentDir, modifiedTitle);
          try {
            fs.renameSync(folderPath, newFolderPath);
            console.log(`Renamed folder to: ${modifiedTitle}`);
          } catch (error) {
            console.error(`Error renaming folder: ${error}`);
          }
        }
      }
    }
  });
  console.log(chalk.green("The title and folder names synced successfully"));
}

checkFolderAndTitle("./content");
