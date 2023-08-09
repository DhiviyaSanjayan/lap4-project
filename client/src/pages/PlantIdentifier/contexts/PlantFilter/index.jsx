import { useState, useContext, createContext } from "react";

const PlantFilterContext = createContext();

export const PlantFilterProvider = ({ children }) => {
  const [flowerColors, setFlowerColors] = useState(["yellow"]);
  const [filterResults, setFilterResults] = useState([]);

  return (
    <PlantFilterContext.Provider
      value={{
        flowerColors,
        setFlowerColors,
        filterResults,
        setFilterResults,
      }}
    >
      {children}
    </PlantFilterContext.Provider>
  );
};

export const usePlantFilters = () => useContext(PlantFilterContext);
