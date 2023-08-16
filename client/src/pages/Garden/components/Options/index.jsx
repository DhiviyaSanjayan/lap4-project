
import { useGarden } from "../../contexts";
import PlantOptions from "../PlantOptions";
import AnimalOptions from "../AnimalOptions";

import styles from "./style.module.css";

export default function Options() {
  const {
    plantOptions,
    setPlantOptions,
    plants,
    animalOptions,
    setAnimalOptions,
    animals,
  } = useGarden();
  console.log(animals)
  return (
    <>
      {animals.length && animalOptions && (
        <AnimalOptions {...{ animalOptions, setAnimalOptions, animals }} />
      )}
      {plants.length && plantOptions && (
        <PlantOptions {...{ plantOptions, setPlantOptions, plants }} />
      )}
    </>
  );
}
