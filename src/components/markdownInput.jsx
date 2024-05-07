import { useState } from "react";

const MarkdownInput = ({ onSave, initialValue }) => {
  const [title, setTitle] = useState(initialValue || "");
  const [markdown, setMarkdown] = useState(initialValue || "");

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleChange = (event) => {
    setMarkdown(event.target.value);
  };

  const handleSave = () => {
    onSave({ title, content: markdown });
    setTitle("");
    setMarkdown("");
  };

  return (
    <>
      <input
        type="text"
        value={title}
        onChange={handleTitleChange}
        placeholder="Enter title"
      />
      <textarea
        value={markdown}
        onChange={handleChange}
        placeholder="Enter your note here"
      />
      <button onClick={handleSave}>Save</button>
    </>
  );
};

export default MarkdownInput;
