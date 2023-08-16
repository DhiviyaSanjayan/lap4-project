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
      setPlants(gameInfo.plants);
      setAnimals(gameInfo.animals);
      setUser(gameInfo.user);
    })();
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
