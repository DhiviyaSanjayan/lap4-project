import React, { useState, useContext } from "react";
import style from "./style.module.css";

export default function AddPlant() {
  const [inputText, setInputText] = useState("");
  const [species, setSpecies] = useState(""); //plant species detected by Plant.id
  const [imgFile, setImgFile] = useState("");
  const [base64Image, setbase64Image] = useState("");
  const [imgOutput, setimgOutput] = useState([]);
  const [plantColor, setPlantColor] = useState("");
  const [cartoonURL, setCartoonURL] = useState("");
  const [message, setMessage] = useState("This is a message.");
  const token = localStorage.getItem("token");
  const API_URL = "https://plant.id/api/v3/identification";
  const API_KEY = "maxIYtXoGDBuKMUy9oUfZJbic5Ri5mi6vcg70BqhQ6I180AbNG";

  function sendPlantIDRequest(imgFile) {
    // Send request to backend for Plant.id identification
    const reader = new FileReader();
    reader.readAsDataURL(imgFile);
    reader.onload = function () {
      setbase64Image(reader.result.split(",")[1]);
      //sendRequest(base64Image);
    };
    reader.onerror = function (error) {
      console.error("Error reading the file:", error);
    };

    const data = {
      images: [`data:image/jpg;base64,${base64Image}`],
    };

    fetch(API_URL, {
      method: "POST",
      headers: {
        "Api-Key": API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((result) => {
        // Displaying the result on the page
        setSpecies(result.result.classification.suggestions[0].name);
        const promptText = `Draw a cartoon version of the plant/flower ${species}, using ${plantColor} as a dominent colour, with a happy smiling face in the style of japanese anime and in transparent background. The image needs to show the complete flower.`;
        console.log(promptText);

        setMessage(
          `You have a ${species} plant in ${plantColor} colour. Pick your favourite cartoon version.`
        );

        generateImage(promptText);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        alert("There was an error identifying the plant. Please try again.");
      });
  }

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
    e.preventDefault();

    //Check if user selected an image file
    if (!imgFile) {
      setMessage("Please select a file");
      return;
    }

    let formData = new FormData();
    formData.append("image", imgFile);

    try {
      //send the image file to backend for Vision AI colour
      const response = await fetch(`${import.meta.env.VITE_SERVER}/visionai`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      setPlantColor(data.dominentColorInHex);

      //send the image file to backend for cartoon generation
      sendPlantIDRequest(imgFile);
    } catch (error) {
      console.error("Error uploading file:", error);
      setMessage("Error uploading file");
    }
  }

  async function handleSubmit(e) {
    try {
      console.log("Cartoon URL", cartoonURL);
      e.preventDefault();
      let formData = new FormData();
      formData.append("plant_pic", cartoonURL); //The URL of the selected cartoon
      
      //Send create plant request to backend
      //Info needed: pet_name, plant_name, perenual_id

      formData.append("pet_name", inputText);
      formData.append("plant_name", species); //plant species
      formData.append("perenual_id", 167); //perenual id

      const createPlantResponse = await fetch(
        `${import.meta.env.VITE_SERVER}/plants`,
        {
          method: "POST",
          headers: { Authorization: token },
          body: formData,
        }
      );
      const createData = await createPlantResponse.json();
      console.log(createData);
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
              id="imageUpload"
              onChange={handleImageUpload}
              accept="image/*"
            />
          </div>
          <button type="upload" onClick={handleUpload}>
            Upload
          </button>
          <div>
            {imgOutput.length > 0 &&
              imgOutput.map((img, index) => (
                <div key={index}>
                  <p>Image {index+1}</p>
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
