var TreeSet = require('../../src/adt/treeSet');

test('can add', () => TreeSet().add('f'));
test('can has', () => {
  const X = TreeSet();
  X.add('f');
  return X.has('f');
});
test('can chain', () => {
  return TreeSet()
    .add('g')
    .has('g');
});
test('can remove', () => {
  return !TreeSet()
    .add('g')
    .add('x')
    .remove('g')
    .has('g');
});
test('does sort', () => {
  return TreeSet()
    .add('b')
    .add('a')
    .toArray()[0] === 'a';
});
test('does sort well', () => {
  return TreeSet()
    .addAll('oisenfq23'.split(''))
    .remove('f')
    .toArray().join('') === '23einoqs';
});
test('can add a lot', () => {
  const A = 'oiaoinisefoseifmscoisneizoAfajsoie;jfqew.,xvf'.split('');
  const B = ';.,+'.split('');
  const AMinusB = 'oiaoinisefoseifmscoisneizoAfajsoiejfqewxvf'.split('');
  TreeSet()
    .addAll(A)
    .removeAll(B)
    .hasAll(AMinusB);
});
