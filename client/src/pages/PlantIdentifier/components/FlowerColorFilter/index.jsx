import COLOR_LIST from "./data/color_list.json";
import { usePlantFilters } from "../../contexts";
import styles from "./style.module.css";

export default function FlowerColorFilter() {
  const { flowerColors, setFlowerColors } = usePlantFilters();
  
  return (
    <div id="flower-color-filter" className={styles["container"]}>
      {COLOR_LIST.map((color) => (
        <button
          key={color}
          className={`${styles["color-square"]} ${
            flowerColors.includes(color) ? styles["selected"] : ""
          }`}
          style={{ backgroundColor: color }}
          onClick={() => {
            if (flowerColors.includes(color)) {
              setFlowerColors((state) => state.filter((c) => c !== color));
            } else {
              setFlowerColors((state) => [...state, color]);
            }
          }}
        >
          {color}
        </button>
      ))}
    </div>
  );
}
