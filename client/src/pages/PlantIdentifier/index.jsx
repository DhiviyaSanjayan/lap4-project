import { useState } from "react";

import { FlowerColorFilter, FetchResultButton, FilterResults } from "./components";
import { PlantFilterProvider } from "./contexts";
import styles from "./style.module.css";

export default function PlantIdentifier() {
  
  return (
    <PlantFilterProvider>
      <main className={styles["container"]}>
        <div>
        <FlowerColorFilter />
        <FetchResultButton />
        </div>
        
        <FilterResults />
      </main>
    </PlantFilterProvider>
  );
}
