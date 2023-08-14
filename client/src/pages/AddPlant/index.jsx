import React, { useState, useContext } from "react";
import style from "./style.module.css";

export default function AddPlant() {
  const [inputText, setInputText] = useState("");
  const [speciesText, setSpeciesText] = useState("");
  const [imgFile, setImgFile] = useState("");
  const [message, setMessage] = useState("This is a message.");

  async function handleSubmit(e) {
    e.preventDefault();
    console.log(imgFile);

    if (!imgFile) {
      setMessage("Please select a file");
      return;
    }

    const formData = new FormData();
    formData.append("image", imgFile);

    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER}/visionai`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      console.log(data)
      setMessage(data.message);
    } catch (error) {
      console.error("Error uploading file:", error);
      setMessage("Error uploading file");
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

        <h3>Status {message}</h3>

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
          <button type="submit">
            Upload
          </button>
        </form>
      </main>
    </div>
  );
}
