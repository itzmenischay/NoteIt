import React, { useContext } from 'react';
import noteContext from "../context/notes/noteContext";
import "./Noteitem.css";

const Noteitem = (props) => {
  const context = useContext(noteContext);
  const { deleteNote } = context;
  const { note, updateNote } = props;

  return (
    <div className="col-md-3">
      <div className="note-card my-3">
        <h5 className="note-title">{note.title}</h5>
        <p className="note-description">{note.description}</p>
        <div className="note-actions">
          <button className="icon-btn" onClick={() => updateNote(note)}>
            <i className="fa-solid fa-pen-to-square"></i>
          </button>
          <button className="icon-btn" onClick={() => { deleteNote(note._id); props.showAlert("Deleted successfully", "success"); }}>
            <i className="fa-solid fa-trash"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Noteitem;
