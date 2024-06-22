import React, { useState, useEffect } from "react";
import api from "../api";
import Note from "../components/Note";
import "../styles/Note.css";

function Home() {
  const [notes, setNotes] = useState([]);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");

  useEffect(() => {
    getNotes();
  }, []);

  const getNotes = async () => {
    try {
      const res = await api.get("/api/notes/");
      setNotes(res.data);
      console.log(res.data);
    } catch (error) {
      alert(error);
    }
  };

  const deleteNote = async (id) => {
    try {
      const res = await api.delete(`/api/notes/delete/${id}/`);
      if (res.status === 204) {
        alert("Note deleted successfully");
        getNotes();
      } else {
        alert("Error deleting note");
      }
    } catch (error) {
      alert(error);
    }
  };

  const createNote = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/api/notes/", { title, content });
      if (res.status === 201) {
        alert("Note created successfully");
        //setTitle("");
        //setContent("");
        getNotes();
      } else {
        alert("Error creating note");
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div>
      <div>
        <h2>Notes</h2>
        {notes.map((note) => (
          <Note note={note} onDelete={deleteNote} key={note.id} />
        ))}
      </div>
      <h2>Create a Note</h2>
      <form onSubmit={createNote}>
        <label htmlFor="title">Title:</label>
        <br />
        <input
          type="text"
          id="title"
          name="title"
          required
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
        <lable htmlFor="content">Content:</lable>
        <br />
        <textarea
          id="content"
          name="content"
          required
          onChange={(e) => setContent(e.target.value)}
          value={content}
        />
        <br />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default Home;
