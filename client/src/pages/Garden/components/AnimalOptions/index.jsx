import { useLayoutEffect, useState } from "react";
import { useGarden } from "../../contexts";
import { IncreaseCount, IncreaseWellbeing } from "./components";

import ladybug from "../../../../assets/images/animals/ladybug.gif";
import bee from "../../../../assets/images/animals/bee.gif";
import bird from "../../../../assets/images/animals/bird.gif";

import styles from "./style.module.css";

export default function AnimalOptions( { animalOptions, setAnimalOptions, animals } ) {

  const [selectedAnimalObj, setSelectedAnimalObj] = useState(animals[0]);
  const [selectedAnimalType, setSelectedAnimalType] = useState(animals[0].animal_type);
  const [animalURL, setAnimalURL] = useState();

  useLayoutEffect(() => {
    setSelectedAnimalObj(
      animals.find((animal) => animal.animal_type === selectedAnimalType)
    )
  });

  useLayoutEffect(() => {
    let url;
    switch (selectedAnimalObj.animal_type) {
      case "Bees":
        url = bee;
        break;
      case "Birds":
        url = bird;
        break;
      case "Lady Bugs":
        url = ladybug;
        break;
      default:
        break;
    }
    setAnimalURL(url);
  });

  return (
      <div
        className={styles["container"]}
      >
        <button onClick={() => setAnimalOptions(false)}>X</button>
        <select
          defaultValue={selectedAnimalType}
          onChange={(e) =>
            setSelectedAnimalType(e.target.value)
          }
        >
          {animals.map((animal, i) => {
            return (
              <option key={i} value={animal["animal_type"]}>
                {animal["animal_type"]}
              </option>
            );
          })}
        </select>
        <div>{selectedAnimalObj.count}</div>
        <div>{selectedAnimalObj.wellbeing}</div>
        <div>{selectedAnimalObj.info}</div>
        <img src={animalURL} alt={`image of a ${selectedAnimalObj.animal_type}`} />
        <IncreaseCount {...selectedAnimalObj} />
        <IncreaseWellbeing {...selectedAnimalObj} />
      </div>
  );
}
