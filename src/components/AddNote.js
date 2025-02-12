import React, { useContext, useState, useEffect } from 'react';
import noteContext from "../context/notes/noteContext";
import "./AddNote.css";

const AddNote = (props) => {
    const context = useContext(noteContext);
    const { addNote } = context;

    const [note, setNote] = useState({ title: "", description: "", tag: "" });
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);

    useEffect(() => {
        setIsButtonDisabled(note.title.length < 5 || note.description.length < 5);
    }, [note]);

    const handleClick = (e) => {
        e.preventDefault();
        if (note.title.length >= 5 && note.description.length >= 5) {
            addNote(note.title, note.description, note.tag);
            setNote({ title: "", description: "", tag: "" });
            props.showAlert("Added successfully", "success");
        } else {
            props.showAlert("Title and Description must be at least 5 characters", "danger");
        }
    };

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    };

    return (
        <div className="addnote-container">
            <div className="addnote-card">
                <h2 className="addnote-title">Add Note</h2>
                <form className="addnote-form">
                    <div className="input-group">
                        <label htmlFor="title">Title</label>
                        <input 
                            type="text" 
                            id="title" 
                            name="title" 
                            value={note.title} 
                            onChange={onChange} 
                            required 
                            className="rounded-input"
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="description">Description</label>
                        <textarea
                            id="description"
                            name="description"
                            value={note.description}
                            onChange={onChange}
                            required
                            className="rounded-input"
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="tag">Tag</label>
                        <input 
                            type="text" 
                            id="tag" 
                            name="tag" 
                            value={note.tag} 
                            onChange={onChange} 
                            required 
                            className="rounded-input"
                        />
                    </div>
                    <button 
                        disabled={isButtonDisabled} 
                        className="addnote-btn" 
                        onClick={handleClick}
                    >
                        Add Note
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddNote;
