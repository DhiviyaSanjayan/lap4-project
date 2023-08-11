import { useState, useEffect, useContext, createContext } from "react";

const GardenContext = createContext();

export const GardenProvider = ({ children }) => {
  const [display, setDisplay] = useState({});
  const [plant, setPlant] = useState([]);
  const [animal, setAnimal] = useState([]);

  const token = localStorage.getItem("token");

  useEffect(() => {
    async function fetchDisplay() {
      const apiURL = `${import.meta.env.VITE_SERVER}/displays`;
      const headers = {
        Authorization: token,
      };

      const response = await fetch(apiURL, { headers: headers });
      const data = await response.json();
      setDisplay(data);
    }

    async function fetchPlants() {
      const apiURL = `${import.meta.env.VITE_SERVER}/plants`;
      const headers = {
        Authorization: token,
      };

      const response = await fetch(apiURL, { headers: headers });
      const data = await response.json();
      setPlant(data);
    }

    async function fetchAnimals() {
      const apiURL = `${import.meta.env.VITE_SERVER}/animals`;
      const headers = {
        Authorization: token,
      };

      const response = await fetch(apiURL, { headers: headers });
      const data = await response.json();
      setAnimal(data);
    }

    fetchDisplay();
    fetchPlants();
    fetchAnimals();
  }, []);

  return (
    <GardenContext.Provider
      value={{display, setDisplay, plant, setPlant, animal, setAnimal}}
    >
      {children}
    </GardenContext.Provider>
  );
};

export const useGarden = () => useContext(GardenContext);
