import TEXTURE_LIST from "./data/texture_list.json";
import { usePlantFilters } from "../../contexts";
import styles from "./style.module.css";

export default function FoliageTextureFilter() {
  const { foliageTextures, setFoliageTextures } = usePlantFilters();
  
  return (
    <div id="foliage-texture-filter" className={styles["container"]}>
      {TEXTURE_LIST.map((texture) => (
        <button
          key={texture}
          className={`${styles["color-square"]} ${
            foliageTextures.includes(texture) ? styles["selected"] : ""
          }`}
          onClick={() => {
            if (foliageTextures.includes(texture)) {
              setFoliageTextures((state) => state.filter((t) => t !== texture));
            } else {
              setFoliageTextures((state) => [...state, texture]);
            }
          }}
        >
          {texture}
        </button>
      ))}
    </div>
  );
}
