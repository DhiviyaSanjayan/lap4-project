function findIdealPlantConditions(data) {
  let idealSoilMoisture;
  const watering = data["watering"];
  switch (watering) {
    case "Minimum":
      idealSoilMoisture = 55;
      break;
    case "Frequent":
      idealSoilMoisture = 85;
      break;
    case "None":
      idealSoilMoisture = 0;
      break;
    case "Average":
    default:
      idealSoilMoisture = 70;
      break;
  }

  let idealSoilFertility;
  const growthRate = data["growth_rate"];
  switch (growthRate) {
    case "Low":
      idealSoilFertility = 55;
      break;
    case "High":
      idealSoilFertility = 85;
      break;
    case "Moderate":
    default:
      idealSoilFertility = 70;
      break;
  }

  return { idealSoilFertility, idealSoilMoisture };
}

module.exports = findIdealPlantConditions;
