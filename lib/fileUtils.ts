import fs from "fs";
import path from "path";

export function listFiles(directoryPath: string) {
  // Initialize an empty array to store file paths
  let fileList: any[] = [];

  // Get the contents of the directory
  const files = fs.readdirSync(directoryPath);
  //   console.log(files);
  // Iterate through each file/directory in the directory
  files.forEach((file) => {
    // Get the full path of the file/directory
    const filePath = path.join(directoryPath, file);

    // Check if it's a file or directory
    const isFile = fs.statSync(filePath).isFile();

    if (isFile) {
      // If it's a file, add it to the file list
      fileList.push(filePath);
    } else {
      // If it's a directory, recursively list files in that directory
      fileList = fileList.concat(listFiles(filePath));
    }
  });

  return fileList;
}

export function traverseDirectory(dirPath: string) {
  const files = fs.readdirSync(dirPath, { withFileTypes: true });
  const fileTree: any[] = [];

  files.forEach((file) => {
    const fullPath = path.join(dirPath, file.name);
    if (file.isDirectory()) {
      const children = traverseDirectory(fullPath);
      fileTree.push({ name: file.name, isDirectory: true, children });
    } else {
      fileTree.push({ name: file.name, isDirectory: false });
    }
  });

  return fileTree;
}
