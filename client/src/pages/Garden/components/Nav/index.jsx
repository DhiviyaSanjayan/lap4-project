import { useGarden } from "../../contexts";
import styles from "./style.module.css";
export default function Nav() {
  const { setAnimalOptions, user , garden} = useGarden();

  // console.log(garden);
  return (
    <div className={styles["nav"]}>
      div
      <button
        className={styles["animal-options"]}
        onClick={() => setAnimalOptions(true)}
      >
        Open Animal Options
      </button>
      {/* <div>
        <p id="flower-count" className={styles["flower-count"]}>
          {userInfo.plants.length}
        </p>
      </div>
      <div>
        <p id="coins" className={styles["coins"]}>
          {userInfo.user.coins}
        </p>
      </div>
      <div>
        <p id="user-exp" className={styles["user-exp"]}>
          <span>{userInfo.user.exp}</span>
        </p>
      </div> */}
    </div>
  );
}
