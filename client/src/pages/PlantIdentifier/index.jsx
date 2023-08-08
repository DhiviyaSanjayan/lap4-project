import { useState } from "react";
import trefleFetch from "./trefleFetch";

import axios from "axios";

export default function PlantIdentifier() {
  const [plantInfo, setPlantInfo] = useState();

  const fetchPlantData = async () => {
    const data = await trefleFetch('plants')
    
  };

  fetchPlantData();
  return plantInfo && <div>{plantInfo}</div>;
}
