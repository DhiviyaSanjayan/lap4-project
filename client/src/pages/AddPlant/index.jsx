import React, { useState, useContext } from "react";
import axios from "axios";
import style from "./style.module.css";

export default function AddPlant() {
  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);

    try {
      await axios.post(`${import.meta.env.VITE_SERVER}/visionai`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  }

  return (
    <div className={style["outer-container"]}>
      <main className={style["inner-container"]}>
        <h1>Add your plant</h1>

        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="imageUpload">Upload Image:</label>
            <input type="file" name="plant_pic" id="imageUpload" accept="image/*" />
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
