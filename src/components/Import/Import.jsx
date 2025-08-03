import React, { useState } from "react";
import styles from "./Import.module.css";
import downloadIcon from "../../../public/assets/images/downloadIcon.png";

// props
export const Import = ({ onFileUpload, onTextFill, onFileContent }) => {
  const [fileUploaded, setFileUploaded] = useState(null); // state for drag and drop feature
  const [textFilled, setTextFilled] = useState(null); // state for text area
  const [textContent, setTextContent] = useState(""); // state for word count, empty string

  // allows file drop
  const handleDrop = (e) => {
    e.preventDefault(); // prevents opening file
    const file = e.dataTransfer.files[0];
    if (
      (file && file.type === "application/pdf") ||
      file.type ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      setFileUploaded(true);
      onFileUpload(); // notify parent component once file uploads
    } else {
      alert("PDF or DOCX files only."); // error handling
    }
  };

  // allows file drag over
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  // allows files to be read for parsing
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (
      file &&
      (file.type === "application/pdf" ||
        file.type ===
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document")
    ) {
      setFileUploaded(true);
      onFileUpload(); // notify parent component once file uploads
      onFileContent(file); // pass as file object, NOT as its content
    } else {
      alert("PDF or DOCX files only."); // error handling
    }
  };

  // text area for job description
  const handleTextArea = (e) => {
    const text = e.target.value;
    setTextContent(text); // always update local state

    if (text.trim() !== "") {
      setTextFilled(true);
      onTextFill(text); // pass the text content to parent component
    } else {
      setTextFilled(false);
    }
  };

  return (
    <section>
      <h1 className={styles.title}>Parsement</h1>
      <div className={styles.description}>
        The tool that makes job hunting fun.
      </div>
      <div className={styles.container}>
        <label
          htmlFor="input-file"
          className={styles.dropArea}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          <input
            type="file"
            accept=".pdf,.docx"
            id="input-file" // click to upload
            onChange={handleFileChange}
            hidden
          />
          <div className={styles.fileView}>
            <img src={downloadIcon} alt="Download icon" />
            {!fileUploaded ? (
              <p>Drop Files Here or Click to Upload</p>
            ) : (
              <p>Successful File Upload</p>
            )}
          </div>
        </label>
      </div>
      <div className={styles.textContainer}>
        <textarea
          name="text"
          placeholder="Paste Your Job Description Here"
          className={styles.textArea}
          onChange={handleTextArea}
          required
        />
        <span>
          Length of Text: {textContent ? textContent.length : 0} characters
        </span>
      </div>
    </section>
  );
};
