import { usePlantFilters } from "../../contexts";
import styles from "./style.module.css";

export default function FlowerVisibilityFilter() {
  const { isFlowerEasilyVisible, setIsFlowerEasilyVisible } = usePlantFilters();
  return (
    <div id="flower-visibility-filter" className={styles["container"]}>
      <input
        type="checkbox"
        defaultValue={isFlowerEasilyVisible}
        onChange={(e) => {
          setIsFlowerEasilyVisible(e.target.checked)
        }}
      />
    </div>
  );
}
