var getRequires = require('../../src/parsing/getRequires');
const thisFile = 'parsing/getRequires.js';

test('meta test', () => getRequires(thisFile)[0] === "'../../src/parsing/getRequires'");