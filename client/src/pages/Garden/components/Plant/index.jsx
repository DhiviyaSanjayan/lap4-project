import { useLayoutEffect, useState } from "react";
import { useGarden } from "../../contexts";
import getPlantImageURL from "../../utils/getPlantImageURL";
import styles from "./style.module.css";

export default function Plant(props) {
  const [imageURL, setImageURL] = useState();
  const { setPlantOptions } = useGarden();

  const {
    plant_id,
    user_id,
    pet_name,
    plant_name,
    perenual_id,
    pic_filename,
    wellbeing,
    plant_beauty,
    plant_exp,
    soil_moisture,
    soil_fertility,
    creation_date,
  } = props;

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
        <img src={imageURL} alt={`A picture of ${pet_name}`} />
      </button>
    )
  );
}
