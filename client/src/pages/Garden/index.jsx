import { GardenProvider } from "./contexts";
import styles from "./style.module.css";
import { Box, Options, Nav } from "./components";

import { useLayoutEffect } from "react";

export default function Garden() {

  return (
    <GardenProvider>
      <main className={styles["container"]}>
        <Box />
        <Nav />
        <Options />
      </main>
    </GardenProvider>
  );
}
