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

  const [selectedPlantObj, setSelectedPlantObj] = useState(
    plants.find((plant) => plant.plant_id === plantOptions)
  );
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
      setDescription(
        (await getPerenualData(selectedPlantObj.perenual_id))["description"]
      );
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
          {selectedPlantId == 1 ? (
            <div className={styles["description"]}>
              Lilium is a genus of about 100 species of bulbous, herbaceous
              perennials native to Europe, North America and Asia south to the
              Philippines. Lilies typically feature 6-tepaled flowers in a
              variety of shapes (trumpet, funnel, cup, bell, bowl or flat),
              sometimes nodding, sometimes with reflexed petals, atop stiff,
              unbranched stems (1-8' tall) clothed with linear to elliptic
              leaves. Flowers are often fragrant and come in a broad range of
              colors except blue.
            </div>
          ) : selectedPlantId == 2 ? (
            <div className={styles["description"]}>
              Tulipa alberti (albertii is preferred by some experts), commonly
              known as Albert’s tulip, is a species tulip (Division 15) that
              grows to compact 6-8” tall. Each bulb produces 3-4 linear,
              glaucous, undulate, broad-lanceolate, blue-green leaves (to 6”
              long). An erect flowering stem rises up from each bulb to 8” tall
              in April bearing a solitary, cup-shaped, orange-scarlet
              (occasionally yellow) tulip with a yellow-margined, dark purple to
              black basal blotch. This tulip is native to central Asia
              (Turkestan, Kazakhstan, Kyrgyzstan and Uzbekistan).
            </div>
          ) : selectedPlantId == 3 ? (
            <div className={styles["description"]}>
              The Viola tricolor called the wild pansy, this tiny herbaceous
              annual, biennial, or short-lived perennial wildflower was
              introduced to North America from Europe. It is found in
              lichen-dominated or meadow-like rocky outcrops, dry and sloping
              meadows, banks, fields, gardens, wastelands, sand fields, as well
              as seaside beaches. It does not have a basal rosette unlike some
              other violets but has an alternate leave arrangement instead. Its
              three-colored (hence the name) flowers can produce up to 50 seeds
              in each capsule making it spread easily though it is not
              particularly aggressive. Water this plant regularly but do not
              overwater.
            </div>
          ) : selectedPlantId == 4 ? (
            <div className={styles["description"]}>
              Erigeron glaucus 'Sea Breeze' is also known as the Seaside
              Daisy. Erigeron glaucus 'Sea Breeze' is a low-growing, spreading
              semi hardy coastal plant with blue-grey leaves and lavender pink,
              semi-double, daisy like flowers with yellow discs at its centre.
              Flowers from late spring onwards. Height 30cm / 12" Spread 45cm /
              18". This variety loves to grow in the coastal areas. It is
              classed as borderline hardy and it may need some protection from
              frost in colder inland areas.
            </div>
          ) : (
            <div className={styles["description"]}>
              The common sunflower has a green erect stem covered in coarse
              hairs, growing on average around 2m tall. The leaves are broad,
              with serrated edges, and are alternately arranged on the stem. The
              ‘flower’ of the common sunflower is actually a pseudanthium, or
              flowerhead, made up of many small flowers. The outer yellow
              ‘petals’ on the flowerhead are known as ray flowers and are made
              up of multiple petals fused together. Ray petals are usually
              yellow but can sometimes be red or orange. The black-brown flowers
              in the centre of the head, called disk flowers, grow in a spiral
              formation, and mature into sunflower seeds over time.
            </div>
          )}
        </div>
      </div>
      <div className={styles["bottom-left"]}>
        <div>Plant Name: {selectedPlantObj.plant_name}</div>
        <div>Plant Beauty: {selectedPlantObj.plant_beauty}</div>
        <div>Plant Experience: {selectedPlantObj.plant_exp}</div>
        <div>
          Creation Date:{" "}
          {new Date(selectedPlantObj.creation_date).toLocaleDateString()}
        </div>
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
