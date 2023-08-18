import { useLayoutEffect, useState } from "react";
import { useGarden } from "../../../../contexts";
import getPlantImageURL from "../../../../utils/getPlantImageURL";
import stem from "../../../../../../assets/images/garden/flower_stem.png";
import perc2Color from "../../../../../../utils/perc2Color";
import styles from "./style.module.css";

export default function Plant(props) {
  const [imageURL, setImageURL] = useState();
  const { setPlantOptions } = useGarden();

  const { plant_id, pet_name, pic_filename, i, plant_name, wellbeing } = props;
  useLayoutEffect(() => {
    (async () => {
      setImageURL(await getPlantImageURL(pic_filename));
    })();
  }, []);

  return (
    imageURL && (
      <button
        className={styles["plant"]}
        onClick={() => {
          setPlantOptions(plant_id);
        }}
      >
        <img
          className={styles["flower-head"]}
          id={`plant${i}`}
          src={imageURL}
          alt={`A picture of ${pet_name} the ${plant_name}`}
        />
        <span
          className={styles["wellbeing"]}
          style={{
            backgroundColor: perc2Color(wellbeing),
          }}
        ></span>
        <img className={styles["stem"]} src={stem} alt={`A flower stem`} />
      </button>
    )
  );
}
