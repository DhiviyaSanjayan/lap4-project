import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";
import { ReactComponent as LivingRoom } from "../../../../assets/backgrounds/living_room.svg";
import { ReactComponent as Gloves } from "../../../../assets/images/gardening_gloves.svg";
import { ReactComponent as WateringPot } from "../../../../assets/images/watering_pot.svg";
import { useAuth } from "../../../../contexts";
import styles from "./style.module.css";

export default function Backgrounds() {
  const { user } = useAuth();
  const { pathname } = useLocation();

  console.log(user);
  const wdstyle = user ? styles["access"] : "";
  const lvstyle = pathname !== "/" ? styles["login"] : "";
  const ggstyle = pathname == "/login" ? styles["on-login"] : "";
  const wpstyle = pathname == "/register" ? styles["on-register"] : "";

  return (
    <div className={styles["container"]}>
      <LivingRoom
        className={`${styles["living-room"]} ${lvstyle} ${wdstyle}`}
      />
      <Gloves className={`${styles["gloves"]} ${ggstyle} ${wdstyle}`} />
      <WateringPot className={`${styles["pot"]} ${wpstyle}`} />
      <div
        className={`${styles["garden"]} ${styles["background"]} ${wdstyle} ${
          !["/login", "/register"].includes(pathname)
            ? styles["transition-g"]
            : ""
        }`}
      />
    </div>
  );
}
