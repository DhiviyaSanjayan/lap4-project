import { useState } from "react";

import {
  FlowerColorFilter,
  FoliageColorFilter,
  FoliageTextureFilter,
  FetchButton,
  Results,
} from "./components";
import { PlantFilterProvider } from "./contexts";
import styles from "./style.module.css";

export default function PlantIdentifier() {
  return (
    <PlantFilterProvider>
      <main className={styles["container"]}>
        <div>
          <h3>Flower Colors</h3>
          <FlowerColorFilter />
          <h3>Foliage Colors</h3>
          <FoliageColorFilter />
          <h3>Foliage Textures</h3>
          <FoliageTextureFilter />
          <FetchButton />
        </div>
        <Results />
      </main>
    </PlantFilterProvider>
  );
}
