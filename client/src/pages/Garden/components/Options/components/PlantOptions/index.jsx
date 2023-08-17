import { useLayoutEffect, useState } from "react";
import WaterFertilise from "./components/WaterFertilise";
import getPlantImageURL from "../../../../utils/getPlantImageURL";
import { useGarden } from "../../../../contexts";
import { ReactComponent as Cross } from "../../../../../../assets/cross-circle.svg";
import getPerenualData from "../../../../utils/getPerenualData";
import perc2Color from "../../../../../../utils/perc2Color";

import styles from "./style.module.css";

export default function PlantOptions() {
  const { plantOptions, setPlantOptions, plants } = useGarden();

  const [selectedPlantObj, setSelectedPlantObj] = useState(plants.find((plant) => plant.plant_id === plantOptions));
  const [selectedPlantId, setSelectedPlantId] = useState(plantOptions);

  useLayoutEffect(() => {
    setSelectedPlantObj(
      plants.find((plant) => plant.plant_id === selectedPlantId)
    );
  });

  const [imageURL, setImageURL] = useState();
  const [description, setDescription] = useState("");

  useLayoutEffect(() => {
    (async () => {
      setImageURL(await getPlantImageURL(selectedPlantObj.pic_filename));
      // setDescription((await getPerenualData(perenual_id))["description"]);
    })();
  }, []);

  return (
    <div className={styles["container"]}>
      <div className={styles["top-left"]}>
        <div className={styles["dp"]}>
          <h4>{selectedPlantObj.pet_name}</h4>
          <img
            src={imageURL}
            alt={`A picture of ${selectedPlantObj.pet_name} the ${selectedPlantObj.plant_name}`}
          />
        </div>
        <div className={styles["load-bar"]}>
          <div
            className={styles["progress-bar"]}
            style={{
              backgroundColor: perc2Color(selectedPlantObj.wellbeing),
              width: `${selectedPlantObj.wellbeing}%`,
            }}
          ></div>
          <span>Wellbeing: {selectedPlantObj.wellbeing}%</span>
        </div>
      </div>

      <div className={styles["top-right"]}>
        <button className={styles["close"]} onClick={() => setPlantOptions("")}>
          <Cross />
        </button>
        <h4>Description</h4>
        <div className={styles["desc-container"]}>
          <div className={styles["description"]}>
            "Watering European silver fir trees is essential for them to stay
            healthy. It is important to provide them with regular watering,
            especially during their first growing season, as they need to
            establish a good root system. A weekly deep watering is all they
            need, but they should be more frequently watered during periods of
            drought and heat. The soil should always be kept moist but never
            soggy.\n\nIf they are planted in a container, they should be watered
            more frequently as they can dry out quickly in containers. The soil
            should be kept moist but never overly wet. Overwatering can lead to
            root rot, so be sure not to overwater. When watering a container
            grown European Silver Fir, wait for the top 1-2 inches of soil to
            dry out before watering again.\n\nMulching around a European silver
            fir is a great way to help with water retention and help the soil
            stay moist. An organic mulch, such as wood chips or shredded bark,
            can help to keep the soil from drying out and also help reduce the
            amount of time spent watering. It also helps suppress weeds and
            keeps the roots protected from extreme temperatures.\n\nOverall,
            regular and consistent watering is important for young European
            silver fir trees to help them grow and thrive.
          </div>
          {/* <div>{description.replace(/(?:\r\n|\r|\n)/g, '<br>')}</div> */}
        </div>
      </div>
      <div className={styles["bottom-left"]}>
        <div>Plant Name: {selectedPlantObj.plant_name}</div>
        <div>Plant Beauty: {selectedPlantObj.plant_beauty}</div>
        <div>Plant Experience: {selectedPlantObj.plant_exp}</div>
        <div>Creation Date: {new Date(selectedPlantObj.creation_date).toLocaleDateString()}</div>
      </div>
      <div className={styles["bottom-right"]}>
        <div id="soil-moisture" className={styles["load-bar"]}>
          <div
            className={styles["progress-bar"]}
            style={{
              width: `${selectedPlantObj.soil_moisture}%`,
            }}
          ></div>
          <span>Soil Moisture: {selectedPlantObj.soil_moisture}%</span>
        </div>
        <div id="soil-fertility" className={styles["load-bar"]}>
          <div
            className={styles["progress-bar"]}
            style={{
              width: `${selectedPlantObj.soil_fertility}%`,
            }}
          ></div>
          <span>Soil Fertility: {selectedPlantObj.soil_fertility}%</span>
        </div>
        <WaterFertilise {...selectedPlantObj} />
      </div>
    </div>
  );
}
