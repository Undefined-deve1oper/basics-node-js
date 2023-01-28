const yargs = require("yargs");
const pkg = require("./package.json");

yargs.version(pkg.version);

yargs.command({
    command: "add",
    describe: "Add new note to list",
    builder: {
        title: {
            type: "string",
            describe: "Note title"
        }
    },
    handler({ title }) {
        console.log("Add command: ", title);
    }
});

yargs.command({
    command: "list",
    describe: "Print all notes",
    builder: {
        title: {
            type: "string",
            describe: "Note title"
        }
    },
    handler({ title }) {
        console.log("Add command: ", title);
    }
});

yargs.parse();
