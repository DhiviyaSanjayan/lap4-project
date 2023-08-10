import React, { useState, useContext, useEffect } from "react";
import style from "./style.module.css";
import { useAuth } from "../../contexts";

export default function Garden() {
  const [garden, setGarden] = useState({});
  const [plant, setPlant] = useState([]);
  const [animal, setAnimal] = useState([]);

  const { user } = useAuth();

  console.log("user", user);

  //Get user token from localStorage??

  async function fetchGarden() {
    // use API to fetch data

    // const response = await fetch(`${process.env.VITE_SERVER}/`)
    // const data = await response.json()

    //mocking data for now
    const data = {
      garden_id: 1,
      user_id: 1,
      name: "My Garden",
      weather: 1,
      soil_quality: 1,
      pest_level: 50,
      water_level: 50,
    };
    setGarden(data);
  }

  async function fetchPlants() {
    // use API to fetch data

    // const response = await fetch(`${process.env.VITE_SERVER}/`)
    // const data = await response.json()

    //mocking data for now
    const data = [{
        'plant_id': 1,
        'user_id': 1,
        'nickname': 'My first plant',
        'name': 'My first plant',
        'Wellbeing_rating': 50,
        'Water Satisfaction': 50,
        'Nutrient satisfaction': 50,
        'Air Satisfaction': 50,
        'Space Satisfaction': 50,
        'Light Satisfaction': 50  
    }, 
    {
        'plant_id': 2,
        'user_id': 1,
        'nickname': 'My second plant',
        'name': 'My second plant',
        'Wellbeing_rating': 50,
        'Water Satisfaction': 50,
        'Nutrient satisfaction': 50,
        'Air Satisfaction': 50,
        'Space Satisfaction': 50,
        'Light Satisfaction': 50  
    }, 
    {
        'plant_id': 3,
        'user_id': 1,
        'nickname': 'My third plant',
        'name': 'My third plant',
        'Wellbeing_rating': 50,
        'Water Satisfaction': 50,
        'Nutrient satisfaction': 50,
        'Air Satisfaction': 50,
        'Space Satisfaction': 50,
        'Light Satisfaction': 50  
    }, ]
    setPlant(data);
  }

  async function fetchAnimals() {
    // use API to fetch data

    // const response = await fetch(`${process.env.VITE_SERVER}/`)
    // const data = await response.json()

    //mocking data for now
    const data = [{
        'animal_id': 1,
        'user_id': 1,
        'name': 'Bee',
        'wellbeing': 50,
        'influence': 50
    }, 
    {
        'animal_id': 2,
        'user_id': 1,
        'name': 'Bird',
        'wellbeing': 50,
        'influence': 50
    }, 
    {
        'animal_id': 3,
        'user_id': 1,
        'name': 'Ladybird',
        'wellbeing': 50,
        'influence': 50
    }, ]

    setAnimal(data);
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
            {plant && (plant.map((plantObj, index) => (
                <div key={index}>
                {Object.entries(plantObj).map(([key, value]) => (
                    <p key={key}>
                    {key}: {value}
                    </p>
                ))}
                </div>
            )))}
        </div>
        <h2>Animal Object</h2>
        <div>
            {animal && (animal.map((animalObj, index) => (
                <div key={index}>
                {Object.entries(animalObj).map(([key, value]) => (
                    <p key={key}>
                    {key}: {value}
                    </p>
                ))}
                </div>
            )))}
        </div>
      </main>
    </div>
  );
}
