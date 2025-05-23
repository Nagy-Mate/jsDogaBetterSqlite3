import Database from "better-sqlite3";

const db = new Database('./Data/database.sqlite');

db.prepare("CREATE TABLE IF NOT EXISTS notes (id INTEGER PRIMARY KEY, title TEXT, content TEXT)").run();

export const getNotes = () => db.prepare("SELECT * FROM notes").all();

export const getNote = (id) => db.prepare("SELECT * FROM notes WHERE id = ?").get(id);

export const postNote = (title, content) => db.prepare("INSERT INTO notes (title, content) VALUES(?,?)").run(title, content);

export const deleteNote = (id) => db.prepare("DELETE FROM notes WHERE id = ?").run(id);

const notes = [
    {title: "note1", content: "content1"},
    {title: "note2", content: "content2"},
    {title: "note3", content: "content3"},
    {title: "note4", content: "content4"},
    {title: "note5", content: "content5"},

];
//for(const n of notes ) postNote(n.title, n.content);