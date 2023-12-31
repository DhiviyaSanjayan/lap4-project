import { useState, useEffect, useContext, createContext } from "react";
import fetchAllUserInfo from "../../../../utils/fetchAllUserInfo";
const GardenContext = createContext();

export const GardenProvider = ({ children }) => {
  const [display, setDisplay] = useState({});
  const [plants, setPlants] = useState([]);
  const [animals, setAnimals] = useState([]);
  const [user, setUser] = useState({});
  const [plantOptions, setPlantOptions] = useState();
  const [animalOptions, setAnimalOptions] = useState(false);

  useEffect(() => {
    (async () => {
      const gameInfo = await fetchAllUserInfo();
      setDisplay(gameInfo.display);
      setPlants(gameInfo.plants.sort((a, b) => a.plant_id < b.plant_id));
      setAnimals(gameInfo.animals.sort((a, b) => a.animal_id < b.animal_id));
      setUser(gameInfo.user);
    })();

    const timeout = setInterval(() => {
      (async () => {
        const gameInfo = await fetchAllUserInfo();
        setDisplay(gameInfo.display);
        setPlants(gameInfo.plants.sort((a, b) => a.plant_id < b.plant_id));
        setAnimals(gameInfo.animals.sort((a, b) => a.animal_id < b.animal_id));
        setUser(gameInfo.user);
      })();
    }, 5000);

    return () => clearInterval(timeout);
  }, []);

  return (
    <GardenContext.Provider
      value={{
        display,
        setDisplay,
        plants,
        setPlants,
        animals,
        setAnimals,
        plantOptions,
        setPlantOptions,
        animalOptions,
        setAnimalOptions,
        user,
        setUser,
      }}
    >
      {children}
    </GardenContext.Provider>
  );
};

export const useGarden = () => useContext(GardenContext);
