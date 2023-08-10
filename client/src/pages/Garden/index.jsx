import React, { useState, useContext, useEffect } from "react";
import style from "./style.module.css";
import { useAuth } from "../../contexts";

export default function Garden() {
  const [garden, setGarden] = useState({});
  const [plant, setPlant] = useState([]);
  const [animal, setAnimal] = useState([]);

  const { user } = useAuth();
  const token = localStorage.getItem("token");

  async function fetchGarden() {
    const apiURL = `${import.meta.env.VITE_SERVER}/gardens`;
    const headers = {
      Authorization: token,
    };

    const response = await fetch(apiURL, { headers: headers });
    const data = await response.json();
    setGarden(data);
    console.log("Garden Data", data);
  }

  async function fetchPlants() {
    const apiURL = `${import.meta.env.VITE_SERVER}/plants`;
    const headers = {
      Authorization: token,
    };

    const response = await fetch(apiURL, { headers: headers });
    const data = await response.json();
    setPlant(data);
    console.log("Plant Data", data);
  }

  async function fetchAnimals() {
    const apiURL = `${import.meta.env.VITE_SERVER}/animal`;
    const headers = {
      Authorization: token,
    };

    const response = await fetch(apiURL, { headers: headers });
    const data = await response.json();
    setAnimal(data);
    console.log("Animal Data", data);
  }

  async function waterPlant(plantObj) {
    // How will we change the water satisifaction level
    // Do a patch request to update the plant object
    // Re-render the garden to show the update
  }

  async function fertilisePlant(plantObj) {
    // How will we change the nutrient satisifaction level
    // Do a patch request to update the plant object
    // Re-render the garden to show the update
  }

  useEffect(() => {
    fetchGarden();
    fetchPlants();
    fetchAnimals();
  }, []);

  return (
    <div className={style["outer-container"]}>
      <main className={style["inner-container"]}>
        <h1>This is your virtual garden</h1>

        <h2>Garden Object</h2>
        <div>
          {garden && (
            <div>
              {Object.entries(garden).map(([key, value]) => (
                <p key={key}>
                  {key}: {value}
                </p>
              ))}
            </div>
          )}
        </div>
        <h2>Plant Array</h2>
        <div>
          {plant &&
            plant.map((plantObj, index) => (
              <div key={index}>
                {Object.entries(plantObj).map(([key, value]) => (
                  <p key={key}>
                    {key}: {value}
                  </p>
                ))}
                <button onClick={() => waterPlant(plantObj)}>Water</button>
                &nbsp;&nbsp;
                <button onClick={() => fertilisePlant(plantObj)}>
                  Fertilise
                </button>
              </div>
            ))}
        </div>
        <h2>Animal Object</h2>
        <div>
          {animal &&
            animal.map((animalObj, index) => (
              <div key={index}>
                {Object.entries(animalObj).map(([key, value]) => (
                  <p key={key}>
                    {key}: {value}
                  </p>
                ))}
              </div>
            ))}
        </div>
      </main>
    </div>
  );
}
