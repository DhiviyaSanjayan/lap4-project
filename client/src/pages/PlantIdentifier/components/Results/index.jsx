import { useState, useEffect } from "react";
import axios from "axios";

import { usePlantFilters } from "../../contexts";

import styles from "./style.module.css";

export default function Results() {
  const { filterResults } = usePlantFilters();
console.log(filterResults)
  return (
    filterResults && (
      <div className={styles["container"]}>
        {filterResults.map((data, i) => {
          const plantName = data["common_name"] ?? data["scientific_name"];
          
          return (
            <div key={i} className={styles["result"]}>
              <p className={styles["plant-name"]}>{plantName}</p>
              <div
                role="img"
                className={styles["plant-image"]}
                aria-label={`picture of ${plantName}`}
                title={`picture of ${plantName}`}
                style={{
                  backgroundImage: `url(${data["image_url"]})`,
                }}
              />
            </div>
          );
        })}
      </div>
    )
  );
}

// const [resultsInfo, setResultsInfo] = useState();

// useEffect(() => {
//   const getResultsInfo = async () => {
//     const rInfo = [];
//     for (let entry of filterResults) {
//       const commonName = entry["common_name"];
//       let imageURL = "";
//       try {
//         const { data } = await axios.get(
//           `https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&formatversion=2&prop=pageimages|pageterms&piprop=original&titles=${entry["scientific_name"]}`
//         );

//         console.log(data["query"]);
//         imageURL = data["query"]["pages"][0]["original"]["source"];
//       } catch (error) {
//         console.log(error);
//       }
//       rInfo.push({ commonName, imageURL });
//     }
//     setResultsInfo(rInfo);
//   };

//   getResultsInfo();
// }, [JSON.stringify(filterResults)]);
