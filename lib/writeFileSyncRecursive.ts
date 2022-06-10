import * as fs from "fs";

// cf. https://gist.github.com/drodsou/de2ba6291aea67ffc5bc4b52d8c32abd
export const writeFileSyncRecursive = (filename: string, content: string) => {
  let filepath = filename.replace(/\\/g, '/');

  let root = '';
  if (filepath[0] === '/') {
    root = '/';
    filepath = filepath.slice(1);
  } else if (filepath[1] === ':') {
    root = filepath.slice(0, 3);
    filepath = filepath.slice(3);
  }

  const folders = filepath.split('/').slice(0, -1);
  folders.reduce(
    (acc, folder) => {
      const folderPath = acc + folder + '/';
      if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath);
      }
      return folderPath
    },
    root
  );

  fs.writeFileSync(root + filepath, content)
}
