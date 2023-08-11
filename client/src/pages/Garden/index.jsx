import React, { useState, useContext, useEffect } from "react";
import style from "./style.module.css";
import { useAuth } from "../../contexts";
import CountdownTimer from "../../components/Timer";

export default function Garden() {
  const [display, setDisplay] = useState({});
  const [plant, setPlant] = useState([]);
  const [animal, setAnimal] = useState([]);

  const { user } = useAuth();
  const token = localStorage.getItem("token");

  async function fetchDisplay() {
    const apiURL = `${import.meta.env.VITE_SERVER}/displays`;
    const headers = {
      Authorization: token,
    };

    const response = await fetch(apiURL, { headers: headers });
    const data = await response.json();
    setDisplay(data);
    console.log("Display Data", data);
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
    const apiURL = `${import.meta.env.VITE_SERVER}/animals`;
    const headers = {
      Authorization: token,
    };

    const response = await fetch(apiURL, { headers: headers });
    const data = await response.json();
    setAnimal(data);
    console.log("Animal Data", data);
  }

  async function waterPlant(plantObj) {
    try {
      //Update the state of the React App
      const new_water_satisfaction = 100;
      const updatedPlantObj = {
        ...plantObj,
        soil_moisture : new_water_satisfaction,
      };
      const updatedPlants = plant.map((p) =>
        p.plant_id === updatedPlantObj.plant_id ? updatedPlantObj : p
      );
      setPlant(updatedPlants);

      // Update the DB with a patch request
      const apiURL = `${import.meta.env.VITE_SERVER}/plants/${
        plantObj.plant_id
      }`;
      const headers = {
        Authorization: token,
        "Content-Type": "application/json",
      };
      const body = JSON.stringify({
        soil_moisture: new_water_satisfaction,
      });

      const response = await fetch(apiURL, {
        method: "PATCH",
        headers: headers,
        body: body,
      });

      if (!response.ok) {
        console.error("Failed to update plant water satisfaction");
        return;
      }
      console.log("Plant water satisfaction updated successfully");
    } catch (error) {
      console.error("Error while updating plant water satisfaction:", error);
    }
  }

  async function fertilisePlant(plantObj) {
    try {
      //Update the state of the React App
      const new_nutrient_satisfaction = 100;
      const updatedPlantObj = {
        ...plantObj,
        soil_fertility : new_nutrient_satisfaction,
      };
      const updatedPlants = plant.map((p) =>
        p.plant_id === updatedPlantObj.plant_id ? updatedPlantObj : p
      );
      setPlant(updatedPlants);

      // Update the DB with a patch request
      const apiURL = `${import.meta.env.VITE_SERVER}/plants/${
        plantObj.plant_id
      }`;
      const headers = {
        Authorization: token,
        "Content-Type": "application/json",
      };
      const body = JSON.stringify({
        soil_fertility : new_nutrient_satisfaction,
      });

      const response = await fetch(apiURL, {
        method: "PATCH",
        headers: headers,
        body: body,
      });

      if (!response.ok) {
        console.error("Failed to update plant nutrient satisfaction");
        return;
      }
      console.log("Plant nutrient satisfaction updated successfully");
    } catch (error) {
      console.error("Error while updating plant nutrient satisfaction:", error);
    }
  }

  useEffect(() => {
    fetchDisplay();
    fetchPlants();
    fetchAnimals();
  }, []);

  return (
    <div className={style["outer-container"]}>
      <main className={style["inner-container"]}>
        <h1>This is your virtual garden</h1>
        <CountdownTimer plant={plant} setPlant={setPlant} />
        <h2>Garden Object</h2>
        <div>
          {display && (
            <div>
              {Object.entries(display).map(([key, value]) => (
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
