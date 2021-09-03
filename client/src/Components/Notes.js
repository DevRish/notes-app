import "./../Styles/Notes.css";
import React, { useEffect, useState } from 'react';

const Notes = (props) => {
    // fetch all notes from database
    const [notes,setNotes] = useState([]);
    useEffect(() => {
        fetchNotes();
    }, [notes]); // adding notes here makes useEffect observe notes array for any changes
    const fetchNotes = async () => {
        const data = await fetch('/pubNotes');
        const dataArr = await data.json();
        setNotes(dataArr);
    };
    // deleting notes
    const deleteNote = async (id) => {
        try {     
            const response = await fetch('/delNote/'+id, { 
                method: 'DELETE',
                headers: {
                    'Content-Type' : 'application/json',
                    'Authorization' : props.token
                }
            });
            console.log('Completed!', response);
          } catch(err) {
            console.error(`Error: ${err}`);
          }
    };
    // adding notes
    const [newNote,setNewNote] = useState('');
    const [newAccess,setNewAccess] = useState('');
    const addNote = async () => {
        fetch('/addNote', {
            method: 'post',
            body: JSON.stringify({ newNote: newNote, user: props.curruser, access: newAccess }),
            headers: {
                'Content-Type' : 'application/json',
                'Authorization' : props.token
            }
        }).then(()=>setNewNote('')).catch((err) => console.log(err));
    }
    return(
        <div className="outer">
            <div className="container">
                <h2>Add Note</h2>
                <div className="addNote inner">
                {
                    props.loggedStatus ? 
                    <div id="form">
                        <div>
                            <h5>Your single-line note: </h5><br/>
                            <input type="text" placeholder="Enter your note" name="newNote" 
                                onChange={(e) => setNewNote(e.target.value)} value={newNote} />
                        </div>
                        <div>
                            <h5>Access: </h5><br/>
                            <select name="access" onChange={(e) => setNewAccess(e.target.value)}>
                                <option value="public">Public</option>
                                <option value="private">Private</option>
                            </select>
                        </div>
                        <input type="hidden" value={props.curruser} name="user" />
                        <button className="btn" onClick={addNote}>ADD</button>
                    </div> :
                    <h3> Please Sign In to add notes </h3>
                }
                </div>
                <h2>Private Notes</h2>
                {
                    props.loggedStatus ? "" : 
                    <div className="fetchedNotes inner">
                        <h3> Please Sign In to view private notes </h3>
                    </div>
                }
                {
                    notes.map(note => {
                        if((note.private===true)&&(note.author===props.curruser))
                        {
                            return(
                                <div className="fetchedNotes inner">
                                    <h3> " {note.note} " </h3>
                                    <button onClick={() => deleteNote(note._id)}><i className="fas fa-trash-alt"></i></button>
                                </div>
                            );
                        }
                        else return "";
                    })
                }
                <h2>Public Notes</h2>
                {
                    notes.map(note => {
                        if(note.private===false)
                        {
                            return(
                                <div className="fetchedNotes inner">
                                    <h3>" {note.note} " <i> --  by {note.author}</i> </h3>
                                    {
                                        (note.author===props.curruser) ?
                                        <button onClick={() => deleteNote(note._id)}><i className="fas fa-trash-alt"></i></button> : ""
                                    }
                                </div>
                            );
                        }
                        else return "" ;
                    })
                }
            </div>
        </div>
    );
} 

export default Notes;