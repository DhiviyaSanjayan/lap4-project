import { useLayoutEffect, useState } from "react";
import Plant from "../Plant";
import { useGarden } from "../../contexts";

import styles from "./style.module.css";

export default function Box() {
  const { plants } = useGarden();

  return (
    plants && (
      <div className={styles["container"]}>
        {plants.map((plant) => (
          <Plant {...plant} />
        ))}
      </div>
    )
  );
}
