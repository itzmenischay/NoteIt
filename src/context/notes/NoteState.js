import React, { useState, useEffect } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesInitial = [];
  const [notes, setNotes] = useState(notesInitial);

  // Get all Notes
  const getNotes = async () => {
      // API Call
      const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjZkZWZjMzYxZWY1NjU2MWIxNDE2NTFhIn0sImlhdCI6MTcyNTkwNjY4OX0.oT1LbTlftxe3AcPT2lm_y3VteJPgTzEivfdULk9zFlQ"
        },
      });
      const json = await response.json();
      console.log(json)
      setNotes(json);
  };

  // Add a Note
  const addNote = async (title, description, tag) => {
      // API Call
      const response = await fetch(`${host}/api/notes/addnote`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjZkZWZjMzYxZWY1NjU2MWIxNDE2NTFhIn0sImlhdCI6MTcyNTkwNjY4OX0.oT1LbTlftxe3AcPT2lm_y3VteJPgTzEivfdULk9zFlQ",
        },
        body: JSON.stringify({ title, description, tag }),
      });
      
      // Logic to add a note in client
      console.log("Adding a new Note");
      const note = {
        _id: "166df4d7af348725d1774dfc88",
        user: "66defc361ef56561b141651a",
        title: title,
        description: description,
        tag: tag,
        date: "2024-09-09T19:33:14.589Z",
        __v: 0,
      };
      setNotes(notes.concat(note));

  };

  // Delete a Note
  const deleteNote = async(id) =>{
    // API Call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjZkZWZjMzYxZWY1NjU2MWIxNDE2NTFhIn0sImlhdCI6MTcyNTkwNjY4OX0.oT1LbTlftxe3AcPT2lm_y3VteJPgTzEivfdULk9zFlQ",
      }
    });
    const json = response.json();
    console.log(json)

    console.log("Deleting the note with id" + id);
    const newNotes = notes.filter((note)=>{ return note._id !== id})
    setNotes(newNotes)
  }

  // Edit a Note
  const editNote = async (id, title, description, tag) => {
      const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjZkZWZjMzYxZWY1NjU2MWIxNDE2NTFhIn0sImlhdCI6MTcyNTkwNjY4OX0.oT1LbTlftxe3AcPT2lm_y3VteJPgTzEivfdULk9zFlQ",
        },
        body: JSON.stringify({ title, description, tag }),
      });
      const json = response.json();

      // Logic to edit in client
      for(let index = 0; index < notes.length; index++){
        const element = notes[index];
        if(element._id === id){
          element.title = title;
          element.description = description;
          element.tag = tag;
        }
      }
  };

  useEffect(() => {
    getNotes();
  }, []);

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
