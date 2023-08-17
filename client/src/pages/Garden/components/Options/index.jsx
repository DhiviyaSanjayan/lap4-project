import { useGarden } from "../../contexts";
import { PlantOptions, AnimalOptions } from "./components";
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
  return (
    (animalOptions || plantOptions) && (
      <div className={styles["outer-container"]}>
        {animals.length && animalOptions && (
          <AnimalOptions {...{ animalOptions, setAnimalOptions, animals }} />
        )}
        {plants.length && plantOptions && (
          <PlantOptions />
        )}
      </div>
    )
  );
}
