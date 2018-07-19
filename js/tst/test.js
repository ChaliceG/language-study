var Locator = require('../src/location/locator');

const tests = [];
Locator('./')
  .getFiles()
  .toArray()
  .forEach(fileName => {
    //intentional global
    test = function (name, fn) {
      tests.push({
        name: name,
        fn: fn,
        fileName: fileName
      });
    };
    require(fileName);
  });

var failure = false;
var lastFileName;
tests.forEach(test => {
  if (lastFileName !== test.fileName) {
    lastFileName = test.fileName;
    console.log(test.fileName);
  }
  try {
    const result = test.fn();
    if (result === true || typeof result === 'object') {
      console.log(`  \u2714 ${test.name}`);
    } else if (result === undefined) {
      throw 'returned undefined / did not return';
    } else {
      throw 'returned false';
    }
  } catch(e) {
    console.log(`  \u2717 ${test.name}`);
    console.log(`    ${e}`);
    falure = true;
  }
});

if (failure) {
  process.exit(1);
}
