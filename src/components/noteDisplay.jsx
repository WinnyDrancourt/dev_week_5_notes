import React, { useState, useEffect } from "react";
import showdown from "showdown";

const converter = new showdown.Converter();

const NoteDisplay = ({ note, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(note.title);
  const [editedMarkdown, setEditedMarkdown] = useState(note.content);

  useEffect(() => {
    setEditedTitle(note.title);
    setEditedMarkdown(note.content);
  }, [note]);

  const html = converter.makeHtml(note.content);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    onUpdate({ id: note.id, title: editedTitle, content: editedMarkdown });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedTitle(note.title);
    setEditedMarkdown(note.content);
  };

  const handleChangeTitle = (event) => {
    setEditedTitle(event.target.value);
  };

  const handleChange = (event) => {
    setEditedMarkdown(event.target.value);
  };

  const handleDelete = () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this note?",
    );
    if (confirmDelete) {
      onDelete(note.id);
    }
  };
  return (
    <>
      {note.content ? (
        <>
          {isEditing ? (
            <>
              <input value={editedTitle} onChange={handleChangeTitle} />
              <textarea value={editedMarkdown} onChange={handleChange} />
              <button onClick={handleSave}>Save</button>
              <button onClick={handleCancel}>Cancel</button>
            </>
          ) : (
            <>
              <h2>{note.title}</h2>
              <div dangerouslySetInnerHTML={{ __html: html }} />
              <button onClick={handleEdit}>Edit</button>
              <button onClick={handleDelete}>Delete</button>
            </>
          )}
        </>
      ) : null}
    </>
  );
};

export default NoteDisplay;
