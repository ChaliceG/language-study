const fs = require('fs');
const TreeSet = require('../adt/treeSet');

//given a directory, return a list of all javascript files in/under that directory
//iterative DFS
function getFiles (root) {
  var dir;
  const allFiles = TreeSet();
  const dirStack = [root];
  var fileNames;
  while (dirStack.length > 0) {
    dir = dirStack.pop();
    fileNames = fs.readdirSync(dir)
      .map(fileName => `${dir}/${fileName}`);
    allFiles.addAll(fileNames.filter(isJsFile));
    fileNames
      .filter(isDirectory)
      .forEach(childDir => dirStack.push(childDir));
  }
  return allFiles;
}

function isJsFile (fileName) {
  return fileName.split('.js')[1] !== undefined;
}

function isDirectory (filePath) {
  return fs.lstatSync(filePath).isDirectory();
}

module.exports = function locator (root) {
	return {
		getFiles: () => getFiles(root)
	};
}