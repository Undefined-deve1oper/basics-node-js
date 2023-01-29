const fs = require("fs/promises");
const path = require("path");
const chalk = require("chalk");

const notesPath = path.join(__dirname, "db.json");

async function addNote(title) {
    const notes = await getNotes();

    const note = {
        title,
        id: Date.now().toString()
    };

    notes.push(note);

    console.log(chalk.bgYellow("The note has been added"));
    await fs.writeFile(notesPath, JSON.stringify(notes));
}

async function removeNote(id) {
    const notes = await getNotes();

    const updatedNotes = notes.filter((note) => note.id !== id);

    console.log(chalk.bgYellow("The note has been deleted"));
    await fs.writeFile(notesPath, JSON.stringify(updatedNotes));
}

async function getNotes() {
    const notes = await fs.readFile(notesPath, { encoding: "utf-8" });
    return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : [];
}

async function printNotes() {
    const notes = await getNotes();
    console.log(chalk.bgGray("Here is the list of notes"));

    notes.forEach((note) => {
        console.log(chalk.yellow(note.id) + ": " + chalk.red(note.title));
    });
}

module.exports = {
    addNote,
    printNotes,
    removeNote
};
