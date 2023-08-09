import { useState, useEffect } from "react";
import axios from "axios";

import { usePlantFilters } from "../../contexts";

import styles from "./style.module.css";

export default function FilterResults() {
  const { filterResults } = usePlantFilters();
  const [resultsInfo, setResultsInfo] = useState();
  console.log(filterResults);
  useEffect(() => {
    const getResultsInfo = async () => {
      const rInfo = [];
      for (let entry of filterResults) {
        const commonName = entry["common_name"];
        let imageURL = "";
        try {
          const { data } = await axios.get(
            `https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&formatversion=2&prop=pageimages|pageterms&piprop=original&titles=${entry["scientific_name"]}`
          );

          console.log(data["query"]);
          imageURL = data["query"]["pages"][0]["original"]["source"];
        } catch (error) {
          console.log(error);
        }
        rInfo.push({ commonName, imageURL });
      }
      setResultsInfo(rInfo);
    };

    getResultsInfo();
  }, [JSON.stringify(filterResults)]);

  return (
    resultsInfo && (
      <div className={styles["container"]}>
        {resultsInfo.map(({ commonName, imageURL }, i) => {
          return (
            <div key={i} className={styles["result"]}>
              <p className={styles["plant-name"]}>{commonName}</p>
              <img src={imageURL} alt={`picture of ${commonName}`} />
            </div>
          );
        })}
      </div>
    )
  );
}
