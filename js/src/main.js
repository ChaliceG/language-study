const directory = process.argv[2] || '.';

const Locator = require('./location/locator')(directory);

const Parser = require('./parsing/parser')(Locator.getFiles().toArray());

const Grapher = require('./graphing/grapher')(Parser.getDepGraph());

const Printer = require('./printing/printer')(Grapher.getGraph());

console.log(Printer.toXdot());
