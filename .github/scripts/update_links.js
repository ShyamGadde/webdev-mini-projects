const fs = require("fs");
const path = require("path");

// Get all directories
const getDirectories = (source) =>
  fs
    .readdirSync(source, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

// Get all directories with an index.html file
const projectDirs = getDirectories(".").filter((dir) =>
  fs.existsSync(path.join(dir, "index.html"))
);

const toTitleCase = (str) =>
  str
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

// Generate the list items for the HTML and Markdown files
const htmlListItems = projectDirs
  .map((dir) => `<li><a href="./${dir}">${toTitleCase(dir)}</a></li>`)
  .join("\n");
console.log(htmlListItems);

// Update index.html
const indexPath = path.join(__dirname, "../..", "index.html");
console.log(indexPath);
let indexHtml = fs.readFileSync(indexPath, "utf8");
indexHtml = indexHtml.replace(
  /<ul id="project-list">[\s\S]*?<\/ul>/,
  `<ul id="project-list">\n${htmlListItems}\n</ul>`
);
fs.writeFileSync(indexPath, indexHtml);
