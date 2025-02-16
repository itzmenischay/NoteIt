import React, { useState, useContext, useEffect, useRef } from "react";
import { FaPlus } from "react-icons/fa";
import noteContext from "../context/notes/noteContext";
import "../styles/AddNote.css";

const AddNote = (props) => {
    const context = useContext(noteContext);
    const { addNote } = context;

    const [note, setNote] = useState({ etitle: "", edescription: "", etag: "" });
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const modalRef = useRef(null);

    useEffect(() => {
        setIsButtonDisabled(note.etitle.length < 5 || note.edescription.length < 5);
    }, [note]);

    const handleClick = (e) => {
        e.preventDefault();
        if (note.etitle.length >= 5 && note.edescription.length >= 5) {
            addNote(note.etitle, note.edescription, note.etag);
            setNote({ etitle: "", edescription: "", etag: "" });
            props.showAlert("Added successfully", "success");
            modalRef.current.click();
        } else {
            props.showAlert("Title and Description must be at least 5 characters", "danger");
        }
    };

    const onChange = (e) => {
        const { name, value } = e.target;
        if (name === "etag" && value.length > 14) return;
        setNote({ ...note, [name]: value });
    };

    return (
        <>
            <div className="floating-button" data-bs-toggle="modal" data-bs-target="#exampleModal">
                <FaPlus className="plus-icon" />
            </div>
            <div className="add-modal-position modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Add Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className="my-3">
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle" value={note.etitle} name="etitle" onChange={onChange} minLength={5} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="edescription" value={note.edescription} name="edescription" onChange={onChange} minLength={5} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="etag" value={note.etag} name="etag" onChange={onChange} maxLength={14} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={modalRef} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                            <button disabled={isButtonDisabled} onClick={handleClick} type="button" className="btn btn-primary">Add Note</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AddNote;
