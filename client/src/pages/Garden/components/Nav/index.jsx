import { useGarden } from "../../contexts";
import styles from "./style.module.css";
export default function Nav() {
  const { setAnimalOptions } = useGarden();
  return (
    <button
      className={styles["container"]}
      onClick={() => setAnimalOptions(true)}
    >
      Open Animal Options
    </button>
  );
}
