const TreeSet = require('../adt/treeSet');

function buildGraph (depGraph) {
  const fileSet = TreeSet().addAll(Object.keys(depGraph));
  const sortedFiles = fileSet.toArray();
  var id = 0, tokens, traverser, focusDir, nextStep;
  const graph = {
    children: {}
  };
  const ids = sortedFiles
    .map( (file, index) => [file, index])
    .reduce( (map, pair) => {
      map[pair[0]] = `a${pair[1]}`;
      return map;
    }, {});

  Object.keys(ids).forEach( file => {
    tokens = file.split('/');
    fileObj = {
      id: ids[file],
      name: tokens[tokens.length - 1],
      dependencies: depGraph[file]
        .filter(fileSet.has)
        .map(fileName => ids[fileName])
    }

    focusDir = graph;
    for(traverser = 0; traverser < tokens.length - 1; traverser++) {
      nextStep = tokens[traverser];
      if (typeof focusDir.children[nextStep] !== 'object') {
        focusDir.children[nextStep] = {
          name: nextStep,
          children: {}
        }
      }
      focusDir = focusDir.children[nextStep];
    }
    focusDir.children[file] = fileObj;
  });

  return graph;
}


module.exports = function (depGraph) {
  return {
    getGraph: () => buildGraph(depGraph)
  }
}