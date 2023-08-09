import React, { useState, useContext } from "react";
import style from "./style.module.css";

export default function AddPlant() {
  const [inputText, setInputText] = useState("");
  const [speciesText, setSpeciesText] = useState("");
  const [imgFile, setImgFile] = useState("");

  async function handleSubmit() {}

  async function handleInput(e) {
    setInputText(e.target.value);
  }

  async function handleSpeciesInput(e) {
    setSpeciesText(e.target.value);
  }

  async function handleImageUpload() {}

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
