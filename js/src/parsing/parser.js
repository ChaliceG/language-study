const getRequires = require('./getRequires');
const TreeSet = require('../adt/treeSet');
const absolutify = require('./absolutify');

function getDepGraph (files) {
  return files.reduce( (depGraph, nextFile) => {
    depGraph[clean(nextFile)] = getRequires(nextFile)
      .map(child => clean(absolutify(nextFile, destringify(child))));
    return depGraph;
  }, {});
}

function clean (fileName) {
  return fileName
    .replace('./', '')
    .replace('.js', '');
}

function destringify (name) {
  return name
    .replace(/\'/g, '')
    .replace(/"/g, '');
}

module.exports = function (files) {
  return {
    getDepGraph: () => getDepGraph(files)
  };
}