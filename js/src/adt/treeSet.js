//Simple implementation of a sorted tree set that stores strings

function recurser (nullBehavior, shouldRemove) {
  return function R (root, input) {
    if (typeof root !== 'object') return nullBehavior(root, input);
    if (root.val > input) {
      return Object.assign(root, {
        left: R(root.left, input)
      });
    }
    if (root.val < input) {
      return Object.assign(root, {
        right: R(root.right, input)
      });
    }
    if (root.val === input) {
      return Object.assign(root, {removed: shouldRemove});
    }
    return root;
  }
}

const adder = recurser(
  (root, input) => { return { val: input }; },
  false
);

const remover = recurser(
  () => undefined,
  true
);

function has (root, input) {
  if (typeof root !== 'object') return false;
  if (root.val > input) return has(root.left, input);
  if (root.val < input) return has(root.right, input);
  if (root.val === input && root.removed !== true) return true;
  return false;
}

function toArray (tree) {
  if (typeof tree !== 'object') {
    return [];
  }
  const stack = [tree.right, tree.val, tree.left];
  var ret = [], focus;
  while (stack.length > 0) {
    focus = stack.pop();
    if (typeof focus === 'object') {
      stack.push(focus.right);
      if (!focus.removed) stack.push(focus.val);
      stack.push(focus.left);
    } else if (typeof focus === 'string') {
      ret.push(focus);
    }
  }
  return ret;
}

module.exports = function TreeSetCtr () {
  var root = undefined;

  function add (input) {
    if (typeof input !== 'string') throw 'TreeSet only accepts strings';
    root = adder(root, input);
    return this;
  }
  function remove (input) {
    root = remover(root, input);
    return this;
  }
  function addAll (inputArray) {
    if (!Array.isArray(inputArray)) throw 'TreeSet.addAll accepts an array of strings';
    inputArray.forEach(add);
    return this;
  }
  function removeAll (inputArray) {
    if (!Array.isArray(inputArray)) throw 'TreeSet.removeAll accepts an array of strings';
    inputArray.forEach(remove);
    return this;
  }
  function hasAll (inputArray) {
    if (!Array.isArray(inputArray)) throw 'TreeSet.hasAll accepts an array of strings';
    var ret = true;
    inputArray.forEach(i => { ret = has(root, i); });
    return ret;
  }
  return {
    add: add,
    addAll: addAll,
    remove: remove,
    removeAll: removeAll,
    toArray: () => toArray(root),
    toString: () => toArray(root).toString(),
    has: input => has(root, input),
    hasAll: hasAll
  };
};
