import { useLayoutEffect, useState } from "react";
import Plant from "../Plant";
import { useGarden } from "../../contexts";

import styles from "./style.module.css";

export default function Nav() {
  const { setAnimalOptions } = useGarden();
  return <button onClick={() => setAnimalOptions(true)}>Open Animal Options</button>
}
