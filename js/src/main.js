require('../polyfills');
//given a directory, find all the javascript files in that directory
var Locator = require('./location/locator')('.');

const files = Locator.getFiles().toArray();

var getRequires = require('./parsing/getRequires');
const depGraph = files.reduce( (depGraph, nextFile) => {
  depGraph[nextFile] = getRequires(nextFile);
  return depGraph;
}, {});

console.log(depGraph);


// //given a file, find the names of the required files
// var parser = require('./parser');

// //construct a graph of file dependencies
// var grapher = require('./grapher');

// //print a graph of dependencies
// var printer = require('./printer');

