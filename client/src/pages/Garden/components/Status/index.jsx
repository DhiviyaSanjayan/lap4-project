import { useGarden } from "../../contexts";
import styles from "./style.module.css";

export default function Status() {
  const { setAnimalOptions, user, display } = useGarden();
  return (
    <>
      <div className={styles["status"]}>
        <div className={styles["coins"]}>
          <span>Coins</span>
          {user.coins}
        </div>
        <div className={styles["exp"]}>
          <span>Experience</span>
          {user.exp}
        </div>
        <div className={styles["g-name"]}>{display.name}</div>
        <div className={styles["weather"]}>
          <span>Weather</span> {display.weather}/10
        </div>
        <div className={styles["pests"]}>
          <span>Pest Level</span>
          {display.pest_level}%
        </div>
      </div>
      <button
        className={styles["options"]}
        onClick={() => setAnimalOptions(true)}
      >
        Insects & Animals
      </button>
    </>
  );
}
