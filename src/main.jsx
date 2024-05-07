import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import "./style/main.scss";
import NoteDisplay from "./components/noteDisplay";
import MarkdownInput from "./components/markdownInput";
import NoteList from "./components/noteList";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [currentNote, setCurrentNote] = useState("");
  const [showMarkdownInput, setShowMarkdownInput] = useState(false);

  useEffect(() => {
    const storedNotes = localStorage.getItem("notes");
    if (storedNotes) {
      setNotes(JSON.parse(storedNotes));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const handleNewNote = () => {
    setCurrentNote("");
    setShowMarkdownInput(true);
  };

  const handleSave = ({ title, content }) => {
    const newNote = { id: Date.now(), title, content };
    setNotes([...notes, newNote]);
    setCurrentNote(content);
    setShowMarkdownInput(false);
  };

  const handleUpdate = (updatedNote) => {
    const updatedNotes = notes.map((note) =>
      note.id === updatedNote.id ? updatedNote : note,
    );
    setNotes(updatedNotes);
    setCurrentNote(updatedNote.content);
  };

  const handleDelete = (noteid) => {
    const updatedNotes = notes.filter((note) => note.id !== noteid);
    setNotes(updatedNotes);
    setCurrentNote("");
  };

  return (
    <>
      <div id="nav">
        <h1>Notes App</h1>
        <button id="newBtn" onClick={handleNewNote}>
          New Note
        </button>
      </div>
      <NoteList notes={notes} setCurrentNote={setCurrentNote} />
      <div id="content">
        {showMarkdownInput && <MarkdownInput onSave={handleSave} />}
        {currentNote && (
          <NoteDisplay
            note={currentNote}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
          />
        )}
      </div>
    </>
  );
};

const root = createRoot(document.getElementById("root"));
root.render(<App />);
