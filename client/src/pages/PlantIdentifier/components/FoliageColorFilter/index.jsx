import COLOR_LIST from "./data/color_list.json";
import { usePlantFilters } from "../../contexts";
import styles from "./style.module.css";

export default function FoliageColorFilter() {
  const { foliageColors, setFoliageColors } = usePlantFilters();
  
  return (
    <div id="foliage-color-filter" className={styles["container"]}>
      {COLOR_LIST.map((color) => (
        <button
          key={color}
          className={`${styles["color-square"]} ${
            foliageColors.includes(color) ? styles["selected"] : ""
          }`}
          style={{ backgroundColor: color }}
          onClick={() => {
            if (foliageColors.includes(color)) {
              setFoliageColors((state) => state.filter((c) => c !== color));
            } else {
              setFoliageColors((state) => [...state, color]);
            }
          }}
        >
          {color}
        </button>
      ))}
    </div>
  );
}
