var fs = require('fs');

function anyOther () { return () => true; }
function testNext (next) {
  return (nextChar) => next === nextChar;
}
const parsingStateMachine = {
  _start: 'q',
  q: {
    shouldAdvance: testNext('u'),
    next: 'u',
    abort: anyOther()
  },
  u: {
    shouldAdvance: testNext('i'),
    next: 'i',
    abort: anyOther()
  },
  i: {
    shouldAdvance: testNext('r'),
    next: 'r',
    abort: anyOther()
  },
  r: {
    shouldAdvance: testNext('e'),
    next: 'e',
    abort: anyOther()
  },
  e: {
    shouldAdvance: testNext('('),
    next: '(',
    abort: anyOther()
  },
  '(': {
    shouldAdvance: () => true,
    next: 'scan',
    abort: anyOther()
  },
  scan: {
    shouldAdvance: testNext(')'),
    next: ')',
    abort: () => false,
    capture: true
  },
  ')': {
    shouldAdvance: () => false,
    success: true,
    abort: () => true
  }
};

function getSuccesses (text) {
  var i = 0, char, ret = [], capture = '';
  var state = parsingStateMachine[parsingStateMachine._start];
  for (; i<text.length; i++) {
    char = text.charAt(i);
    if (state.shouldAdvance(char)) {
      state = parsingStateMachine[state.next];
    } else if (state.abort(char)) {
      state = parsingStateMachine[parsingStateMachine._start];
      capture = '';
    }
    if (state.capture) {
      capture += char;
    }
    if (state.success) {
      ret.push(capture);
    }
  }
  return ret;
}

module.exports = function (fileName) {
  const fileText = fs.readFileSync(fileName);
  return getSuccesses(fileText.toString());
};
