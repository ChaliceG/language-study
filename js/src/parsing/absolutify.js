module.exports = function (parent, child) {
  const parentTokens = parent.split('/');
  const childTokens = child.split('/');
  var decrementParent = 1;
  var incrementChild = 0;

  while(childTokens[incrementChild][0] === '.') {
    if (childTokens[incrementChild] === '..') {
      decrementParent++;
    }
    incrementChild++;
  }

  return incrementChild === 0
    ? child
    : parentTokens.slice(0, parentTokens.length - decrementParent)
      .concat(childTokens.slice(incrementChild))
      .join('/');
}