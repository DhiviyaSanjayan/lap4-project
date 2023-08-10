import { useState, useContext, createContext } from "react";

const PlantFilterContext = createContext();

export const PlantFilterProvider = ({ children }) => {
  const [flowerColors, setFlowerColors] = useState(["yellow"]);
  const [foliageColors, setFoliageColors] = useState(["green"]);
  const [foliageTextures, setFoliageTextures] = useState(["fine"]);
  const [isFlowerEasilyVisible, setIsFlowerEasilyVisible] = useState(true);

  const [filterResults, setFilterResults] = useState([]);

  return (
    <PlantFilterContext.Provider
      value={{
        flowerColors,
        setFlowerColors,
        foliageColors,
        setFoliageColors,
        filterResults,
        setFilterResults,
        foliageTextures,
        setFoliageTextures,
        isFlowerEasilyVisible,
        setIsFlowerEasilyVisible
      }}
    >
      {children}
    </PlantFilterContext.Provider>
  );
};

export const usePlantFilters = () => useContext(PlantFilterContext);
