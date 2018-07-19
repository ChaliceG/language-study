
function printInDot (graph) {
  
  return `digraph G {
  ${Object.keys(graph.children)
    .map(key => graph.children[key])
    .map(dotify)
    .join('\n  ')}
}`;
}

function dotify (graph) { 
  if (graph.children) {
    return subgraph(graph.name,
      Object.keys(graph.children).map(key => graph.children[key]));
  }
  return leaf(graph.name, graph.id, graph.dependencies || []);
}

function subgraph (label, nodes) {
  return `subgraph cluster_${label} {
  label="${label}";
  ${nodes.map(dotify).join('\n')}
}`;
}

function leaf (label, id, deps) {
  return `
  ${id}[label="${label}"];
  ${deps.length > 0 ? `${id} -> ${deps.join(',')};` : ''}
`;
}

module.exports = function (graph) {
  return {
    toXdot: () => printInDot(graph)
  };
};
