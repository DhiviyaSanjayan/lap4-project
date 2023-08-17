import { useLayoutEffect } from "react";
import Plant from "./components/Plant";
import { useGarden } from "../../contexts";
import moveBee from "./utils/moveBee";
import moveLadyBug from "./utils/moveLadyBug";
import bird from "../../../../assets/images/animals/bird.gif";
import bee from "../../../../assets/images/animals/bee.gif";
import ladybug from "../../../../assets/images/animals/ladybug.gif";
import notes from "../../../../assets/images/animals/musical_notes.gif";

import styles from "./style.module.css";

export default function Box() {
  const { plants } = useGarden();

  const chunkIntoN = (arr, n) => {
    const size = Math.ceil(arr.length / n);
    return Array.from({ length: n }, (_, i) =>
      arr.slice(i * size, i * size + size)
    );
  };
  let i = 0;
  const plantsArr = chunkIntoN(plants, 4);

  useLayoutEffect(() => {
    moveBee("bee1");
    moveBee("bee2");
    moveLadyBug("lb1")
    moveLadyBug("lb2")
    moveLadyBug("lb3")
    moveLadyBug("lb4")
    moveLadyBug("lb5")

    const timeout = setInterval(() => {
      moveBee("bee1");
      moveBee("bee2");
      moveLadyBug("lb1")
      moveLadyBug("lb2")
      moveLadyBug("lb3")
      moveLadyBug("lb4")
      moveLadyBug("lb5")
    }, 15000);

    return () => clearInterval(timeout);
  });

  return (
    plants && (
      <div className={styles["outer-container"]}>
        <div id="garden-box" className={styles["container"]}>
          {plantsArr.map((arr) => (
            <div className={styles["column"]}>
              {arr.map((plant) => (
                <Plant {...plant} i={i++} />
              ))}
            </div>
          ))}
        </div>
        <div id="crawl-area">
          <img id="lb1" className={styles["lb"]} src={ladybug} alt="ladybug gif" />
          <img id="lb2" className={styles["lb"]} src={ladybug} alt="ladybug gif" />
          <img id="lb3" className={styles["lb"]} src={ladybug} alt="ladybug gif" />
          <img id="lb4" className={styles["lb"]} src={ladybug} alt="ladybug gif" />
          <img id="lb5" className={styles["lb"]} src={ladybug} alt="ladybug gif" />
        </div>
        <div className={styles["animations"]}>
          <img className={styles["bird1"]} src={bird} alt="bird gif" />
          <img className={styles["bird2"]} src={bird} alt="bird gif" />
          <img id="bee1" className={styles["bee"]} src={bee} alt="bee gif" />
          <img id="bee2" className={styles["bee"]} src={bee} alt="bee gif" />
          <img
            className={styles["notes1"]}
            src={notes}
            alt="musical notes gif"
          />
          <img
            className={styles["notes2"]}
            src={notes}
            alt="musical notes gif"
          />
        </div>
      </div>
    )
  );
}
