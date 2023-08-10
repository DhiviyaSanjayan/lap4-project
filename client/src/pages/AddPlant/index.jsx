import React, { useState, useContext } from "react";
import style from "./style.module.css";

export default function AddPlant() {
  const [inputText, setInputText] = useState("");
  const [speciesText, setSpeciesText] = useState("");
  const [imgFile, setImgFile] = useState("");

  async function handleSubmit() {
    if (!file) {
      setMessage('Please select a file');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER}/upload`, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      setMessage(data.message);
    } catch (error) {
      console.error('Error uploading file:', error);
      setMessage('Error uploading file');
    }
  }

  async function handleInput(e) {
    setInputText(e.target.value);
  }

  async function handleSpeciesInput(e) {
    setSpeciesText(e.target.value);
  }

  async function handleImageUpload(e) {
    setImgFile(e.target.files[0]);
  }

  return (
    <div className={style["outer-container"]}>
      <main className={style["inner-container"]}>
        <h1>Add your plant</h1>

        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              value={inputText}
              onChange={handleInput}
            />
          </div>
          <div>
            <label htmlFor="species">Species:</label>
            <input
              type="text"
              id="species"
              value={speciesText}
              onChange={handleSpeciesInput}
            />
          </div>
          <div>
            <label htmlFor="imageUpload">Upload Image:</label>
            <input
              type="file"
              id="imageUpload"
              onChange={handleImageUpload}
              accept="image/*"
            />
          </div>
          <button type="submit">Comment</button>
        </form>
      </main>
    </div>
  );
}





// import React, { useState } from 'react';

// function FileUpload() {
//   const [file, setFile] = useState(null);
//   const [message, setMessage] = useState('');

//   const handleFileChange = (event) => {
//     setFile(event.target.files[0]);
//   };

//   const handleUpload = async () => {
//     if (!file) {
//       setMessage('Please select a file');
//       return;
//     }

//     const formData = new FormData();
//     formData.append('file', file);

//     try {
//       const response = await fetch('/upload', {
//         method: 'POST',
//         body: formData,
//       });

//       const data = await response.json();
//       setMessage(data.message);
//     } catch (error) {
//       console.error('Error uploading file:', error);
//       setMessage('Error uploading file');
//     }
//   };

//   return (
//     <div>
//       <h1>File Upload</h1>
//       <input type="file" onChange={handleFileChange} />
//       <button onClick={handleUpload}>Upload</button>
//       <p>{message}</p>
//     </div>
//   );
// }

// export default FileUpload;
