import { useLayoutEffect, useState } from "react";
import { IncreaseCount, IncreaseWellbeing } from "./components";

import perc2Color from "../../../../../../utils/perc2Color";
import { ReactComponent as Cross } from "../../../../../../assets/cross-circle.svg";
import ladybug from "../../../../../../assets/images/animals/ladybug.gif";
import bee from "../../../../../../assets/images/animals/bee.gif";
import bird from "../../../../../../assets/images/animals/bird.gif";

import styles from "./style.module.css";

export default function AnimalOptions({ setAnimalOptions, animals }) {
  const [selectedAnimalObj, setSelectedAnimalObj] = useState(animals[0]);
  const [selectedAnimalType, setSelectedAnimalType] = useState(
    animals[0].animal_type
  );
  const [animalURL, setAnimalURL] = useState();

  useLayoutEffect(() => {
    setSelectedAnimalObj(
      animals.find((animal) => animal.animal_type === selectedAnimalType)
    );
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
    <div className={styles["container"]}>
      <div />
      <select
        className={styles["drop-down"]}
        defaultValue={selectedAnimalType}
        onChange={(e) => setSelectedAnimalType(e.target.value)}
      >
        {animals.map((animal, i) => {
          return (
            <option key={i} value={animal["animal_type"]}>
              {animal["animal_type"]}
            </option>
          );
        })}
      </select>
      <button
        className={styles["close"]}
        onClick={() => setAnimalOptions(false)}
      >
        <Cross />
      </button>
      <div className={styles["wellbeing"]}>
        <div className={styles["load-bar"]}>
          <div
            className={styles["progress-bar"]}
            style={{
              backgroundColor: perc2Color(selectedAnimalObj.wellbeing),
              width: `${selectedAnimalObj.wellbeing}%`,
            }}
          >
          </div>
          <span>Wellbeing: {selectedAnimalObj.wellbeing}%</span>
        </div>
        <IncreaseWellbeing {...selectedAnimalObj} />
      </div>
      <div className={styles["image-container"]}>
        <img
          src={animalURL}
          alt={`image of a ${selectedAnimalObj.animal_type}`}
        />
      </div>
      <div className={styles["count"]}>
        <span>Count: {selectedAnimalObj.count}</span>
        <IncreaseCount {...selectedAnimalObj} />
      </div>
      <div />
      <div className={styles["info"]}>
        <h4>Information</h4>
        <div>{selectedAnimalObj.info}</div>
      </div>
      <div />
    </div>
  );
}
