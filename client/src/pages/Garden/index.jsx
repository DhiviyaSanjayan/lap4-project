import { GardenProvider } from "./contexts";
import styles from "./style.module.css";
import { Box, Options, Status } from "./components";

export default function Garden() {

  return (
    <GardenProvider>
      <main className={styles["container"]}>
        <Box />
        <Status />
        <Options />
      </main>
    </GardenProvider>
  );
}
