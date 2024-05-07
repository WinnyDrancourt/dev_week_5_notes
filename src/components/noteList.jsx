import React, { useState, useEffect } from "react";
import showdown from "showdown";

const converter = new showdown.Converter();

const NoteList = ({ notes, setCurrentNote }) => {
  const [showPopup, setShowPopup] = useState(false);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  useEffect(() => {
    const handleEscape = (event) => {
      if (
        showPopup &&
        !document.getElementById("list-note").contains(event.target)
      ) {
        setShowPopup(false);
      }
    };
    document.addEventListener("click", handleEscape);
    return () => {
      document.removeEventListener("click", handleEscape);
    };
  }, [showPopup]);

  const handleClick = (event) => {
    event.stopPropagation();
    togglePopup();
  };

  return (
    <>
      <button id="listBtn" onClick={handleClick}>
        Show Notes
      </button>
      <div id="list-note" className={showPopup ? "visible" : ""}>
        <div id="list-button">
          {notes.map((note) => (
            <button key={note.id} onClick={() => setCurrentNote(note)}>
              {note.title || note.id}
              <div
                dangerouslySetInnerHTML={{
                  __html: converter.makeHtml(note.content.slice(0, 15) + "..."),
                }}
              />
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default NoteList;
