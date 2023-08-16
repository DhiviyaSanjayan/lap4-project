import React, { useState, useContext, useEffect } from "react";
import { GardenProvider, useGarden } from "./contexts";
import styles from "./style.module.css";
import { Box, Options, Nav } from "./components";

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
