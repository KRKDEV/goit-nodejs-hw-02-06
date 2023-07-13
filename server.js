const app = require("./app");
const path = require("path");
const fs = require("fs").promises;

const isAccessible = (path) => {
  return fs
    .access(path)
    .then(() => true)
    .catch(() => false);
};
const tmpDir = path.join(process.cwd(), "tmp");
const createFolderIsNotExist = async (folder) => {
  if (!(await isAccessible(folder))) {
    await fs.mkdir(folder);
  }
};

app.listen(3000, () => {
  createFolderIsNotExist(tmpDir);
  console.log("Server running. Use our API on port: 3000");
});
