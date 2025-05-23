import express from "express";
import * as db from './Util/database.js';

const PORT  = 8080;
const app = express();
app.use(express.json());

app.get('/notes', (req, res)=>{
    try{
        const notes = db.getNotes();
        res.status(200).json(notes);
    }catch(err){
        res.status(500).json({message: `${err}`});
    }

});

app.get('/notes/:id', (req, res) =>{
    try{
        const note = db.getNote(req.params.id);
        if(!note){
           return res.status(404).json({message: `User not found`});
        }
        res.status(200).json(note);
    }catch(err){
        res.status(500).json({message: `${err}`});
    }
});

app.post('/notes', (req, res) =>{
    try{
        const {title, content} = req.body;
        if(!title || !content){
           return res.status(404).json({message: `Missing data`});
        }
        const note = db.postNote(title, content);
        res.status(200).json({id: note.lastInsertRowid});
    }catch(err){
        res.status(500).json({message: `${err}`});
    }
});

app.delete('/notes/:id', (req, res) =>{
    try{
        const note = db.getNote(req.params.id);
        if(!note){
           return res.status(404).json({message: `Not found`});
        }
        db.deleteNote(note.id);
        res.status(204).json({});
    }catch(err){
        res.status(500).json({message: `${err}`});
    }
});

app.listen(PORT, () =>{
    console.log(`App runs on ${PORT}`);
});