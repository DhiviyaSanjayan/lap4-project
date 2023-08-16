import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import style from "./style.module.css";
import getPerenualID from "../Garden/utils/getPerenualID";

const API_URL = "https://plant.id/api/v3/identification";
const API_KEY = import.meta.env.VITE_PLANTID_KEY;

export default function AddPlant() {
  const [inputText, setInputText] = useState("");
  const [species, setSpecies] = useState(""); //plant species detected by Plant.id
  const [imgFile, setImgFile] = useState(""); // Image uploaded by user
  const [imgOutput, setimgOutput] = useState([]); // Images generated by OpenAI
  const [plantColor, setPlantColor] = useState(""); // Dominant Plant colour detected by VisionAI
  const [cartoonURL, setCartoonURL] = useState(""); // The URL of the OpenAI image selected by user with radio button
  const [message, setMessage] = useState("This is a message."); // Message to be displayed on page
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (species && plantColor) {
      const promptText = `Draw the uncropped flower head of ${species} in the centre, using ${plantColor} as a dominant colour in a realistic style using a white background.`;

      //By Tom
      //const promptText = `Draw the flower/plant Rosa using red as the dominant colour using a corporate art style without a stem in the middle on a white background.`;

      //Draw the flower ${species} without stem, using ${plantColor} as a dominant colour in a realistic style using a white background.

      console.log(promptText);

      setMessage(
        `You have a ${species} plant in ${plantColor} colour. Pick your favourite cartoon version.`
      );

      generateImage(promptText);
    }
  }, [species, plantColor]);

  async function generateImage(prompt) {
    const requestBody = {
      prompt: prompt,
      n: 5,
      size: "256x256",
    };

    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER}/openai`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();
      console.log("OpenAI gereration done.");
      setimgOutput(data.data);
    } catch (error) {
      console.error("Error generating image:", error);
    }
  }

  async function handleUpload(e) {
    async function idPlant(base64Image) {
      const data = {
        images: [`data:image/jpg;base64,${base64Image}`],
      };

      console.log("PlantID", data["images"]);

      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Api-Key": API_KEY,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      //set specices state variable
      setSpecies(result.result.classification.suggestions[0].name);
    }

    async function idPlantColor(imgFile) {
      let formData = new FormData();
      formData.append("image", imgFile);

      const response = await fetch(`${import.meta.env.VITE_SERVER}/visionai`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      //set plant colour state variable
      setPlantColor(data.dominentColorInHex);
    }

    /////////////////////////////
    //Start of the main function
    /////////////////////////////
    e.preventDefault();

    //Check if user selected an image file
    if (!imgFile) {
      setMessage("Please select a file");
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(imgFile);
    reader.onloadend = async function () {
      const base64Image = reader.result.split(",")[1];

      try {
        //id the colour of the plant using VisionAI, set plant colour
        idPlantColor(imgFile);

        //id the plant using Plant.id, set species
        idPlant(base64Image);

        //useEffect will generate image with OpenAI
      } catch (error) {
        console.error("Error uploading file:", error);
        setMessage("Error uploading file");
      }
    };
  }

  async function handleSubmit(e) {
    try {
      e.preventDefault();
      let formData = new FormData();

      // Download the OpenAI image selected by user append to formData
      const url = cartoonURL;
      const fileName = `${species.split(" ")[0]}.jpg`;

      const response = await fetch(url);
      const contentType = response.headers.get("content-type");
      const blob = await response.blob();
      const file = new File([blob], fileName, { type: contentType });
      formData.append("plant_pic", file);

      //Send create plant request to backend
      //Info needed: pet_name, plant_name, perenual_id

      formData.append("pet_name", inputText);
      formData.append("plant_name", species); //plant species
      formData.append("perenual_id", await getPerenualID(species) || 7777); //perenual id, the API might not always work so added a or here for easy testing.

      const createPlantResponse = await fetch(
        `${import.meta.env.VITE_SERVER}/plants`,
        {
          method: "POST",
          headers: { Authorization: token },
          body: formData,
        }
      );
      const createData = await createPlantResponse.json();

      // Log the newly created data and clear OpenAI image output
      console.log(createData);
      setimgOutput([])
      setMessage("Plant added successfully.")

    } catch (error) {
      console.error("Error uploading file:", error);
      setMessage("Error uploading file");
    }
  }

  async function handleInput(e) {
    setInputText(e.target.value);
  }

  async function handleImageUpload(e) {
    setImgFile(e.target.files[0]);
    setMessage(`File selected: ${e.target.files[0].name}`);
  }

  async function handleRadioButton(e) {
    setCartoonURL(e.target.value);
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
            <label htmlFor="imageUpload">Upload Image:</label>
            <input
              type="file"
              name="plant_pic"
              id="imageUpload"
              accept="image/*"
              onChange={handleImageUpload}
            />
          </div>
          <button type="upload" onClick={handleUpload}>
            Upload
          </button>
          <div>
            {imgOutput.length > 0 &&
              imgOutput.map((img, index) => (
                <div key={index}>
                  <p>Image {index + 1}</p>
                  <img src={img.url} alt={`Image ${index}`} />
                  <input
                    type="radio"
                    name="Cartoon"
                    value={img.url}
                    onChange={handleRadioButton}
                  />
                </div>
              ))}
          </div>
          <button type="submit">Submit</button>
        </form>
      </main>
    </div>
  );
}
