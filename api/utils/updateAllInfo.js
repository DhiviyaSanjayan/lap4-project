const User = require("../models/User");
const Plant = require("../models/Plant");
const Animal = require("../models/Animal");
const Display = require("../models/Display");
const getPerenualData = require("./getPerenualData");
const findIdealPlantConditions = require("./findIdealPlantConditions");

// /the amount of time that has gone by in seconds
const realElapsedTime = 60;
const t = realElapsedTime * 0.083;

async function updateUsersInfo(user_id) {
  //get all records related to this user
  const gardenDisplay = await Display.getMyDisplay(user_id);
  const animals = await Animal.getAllMyAnimals(user_id);
  const plants = await Plant.getAllMyPlants(user_id);

  for (const plant of plants) {
    // const perenualData = await getPerenualData(plant["perenual_id"]);
    const perenualData = {
      growth_rate: 'Moderate',
      watering: "Average"
    }

    //plant growth rate to calc SM and SF reductions
    const growthRate = perenualData["growth_rate"];
    let growthMultiplier;
    switch (growthRate) {
      case "Low":
        growthMultiplier = 1.1;
        break;
      case "High":
        growthMultiplier = 1.3;
        break;
      case "Moderate":
      default:
        growthMultiplier = 1.2;
        break;
    }

    /*
     *find the percentage decrease in soil moisture
     */
    //find the sun intensity based on the time of day. It's sunniest at noon in this case
    const sunIntensity = 1 - Math.abs(12 - new Date().getHours()) / 12;
    const sMReduction =
      t * (gardenDisplay["weather"] / 10) * sunIntensity * growthMultiplier;

    const updatedSM = plant["soil_moisture"] - sMReduction;
    plant["soil_moisture"] = updatedSM < 0 ? 0 : updatedSM;

    //find the percentage decrease in soil fertility
    const pBTax = (plant["plant_beauty"] / 10) * 3;
    const pETax = (Math.min(plant["plant_exp"], 10000) / 10000) * 3;
    const sFReduction = (t * 0.5 + pBTax + pETax) * growthMultiplier;
    const updatedSF = plant["soil_fertility"] - sFReduction;
    plant["soil_fertility"] = updatedSF < 0 ? 0 : updatedSF;

    //calculate the new wellbeing of the plant
    const { idealSoilFertility, idealSoilMoisture } =
      findIdealPlantConditions(perenualData);

    //The ideal is that 4 key variables below are as close to 0 as possible. That will be used to fine the plants wellbeing
    //find the difference between the ideal and the actual.
    const soilMoistureIAV = Math.abs(
      idealSoilMoisture - plant["soil_moisture"]
    );
    const soilFertilityIAV = Math.abs(
      idealSoilFertility - plant["soil_fertility"]
    );
    const pestLevel = gardenDisplay["pest_level"];
    const weather = (10 - gardenDisplay["weather"]) * 10;

    //get only the bees and birds
    const beeBird = animals.filter(
      (animal) => animal.animal_type !== "Lady Bugs"
    );
    //add a small amount to plants wellbeing based on the animals, their influence and their count
    let animalBenefit;
    for (let animal of beeBird) {
      animalBenefit =
        (animal["wellbeing"] / 100) *
        2 *
        ((animal["influence"] / 100) * 1) *
        animal["count"] *
        0.02;
    }

    const plantWellbeing =
      100 -
      (soilFertilityIAV + soilMoistureIAV + pestLevel + weather) / 4 +
      animalBenefit;
    plant["wellbeing"] = plantWellbeing > 100 ? 100 : plantWellbeing;
    //increase plant exp based on the plants current wellbeing
    plant["plant_exp"] = parseInt(plant["plant_exp"] + plantWellbeing * 1.5);

    const newPlant = await plant.updateThisPlant({ ...plant });
    console.log(newPlant);
  }

  for (const animal of animals) {
    //find the percentage decrease in the wellBeing
    const pLTax = (gardenDisplay["pest_level"] / 100) * 2;
    const precipTax = ((10 - gardenDisplay["weather"]) / 10) * 2;
    const wBReduction = t * 0.3 + pLTax + precipTax;
    console.log(wBReduction);
    const updatedWB = animal["wellbeing"] - wBReduction;
    animal["wellbeing"] = updatedWB < 0 ? 0 : updatedWB;

    //find the decrease in animal count if any
    const countReduction = wBReduction > 3 ? 1 : 0;
    const updatedCount = animal["count"] - countReduction;
    animal["count"] = updatedCount < 0 ? 0 : updatedCount;

    const newAnimal = await animal.updateThisAnimal({ ...animal });
    console.log(newAnimal);
  }

  const ladyBugs = animals.filter(
    (animal) => animal.animal_type === "Lady Bugs"
  )[0];

  //find the percentage chang in pest level. 15 LBs all with a wellbeing of 100 keeps pest level unchanged
  const pestChange =
    (ladyBugs["wellbeing"] / 100) * (ladyBugs["count"] - 15) * 0.12;
  const updatedPL = gardenDisplay["pest_level"] + pestChange;
  gardenDisplay["pest_level"] =
    updatedPL > 100 ? 100 : updatedPL < 0 ? 0 : updatedPL;

  const newGarden = await gardenDisplay.updateThisDisplay({ ...gardenDisplay });
  console.log(newGarden);
}

//changes the garden display and user experience and coins with a greater interval of time between runs
async function updateAllInfo2() {
  //get all records related to this user
  const allUsers = await User.getAllUsers();
  const allUserIDs = allUsers.map((user) => user["user_id"]);

  for (const user_id of allUserIDs) {
    //change the weather value of garden display randomly
    const gardenDisplay = await Display.getMyDisplay(user_id);
    const udpatedWeather = gardenDisplay["weather"] + Math.round(Math.random() * 4 - 2);
    gardenDisplay["weather"] = udpatedWeather > 100 ? 100 : udpatedWeather < 0 ? 0 : udpatedWeather;

    const newGarden = await gardenDisplay.updateThisDisplay({
      ...gardenDisplay,
    });

    console.log(newGarden)
    const animals = await Animal.getAllMyAnimals(user_id);
    const plants = await Plant.getAllMyPlants(user_id);

    const plantTotal = plants.reduce((total, plant) => {
      return total + plant["wellbeing"] * (plant["plant_beauty"] / 10) * 100;
    }, 0);
    const animalTotal = animals.reduce((total, animal) => {
      return (
        total +
        animal["wellbeing"] * animal["influence"] * animal["count"] * 0.001
      );
    }, 0);
    const user = await User.getOneById(user_id);
    user["coins"] += Math.floor(plantTotal * 0.8);
    user["exp"] += Math.floor(plantTotal + animalTotal * 0.3);
    const updatedUser = await user.updateUserDetails({ ...user });
    console.log(updatedUser);
  }
}

async function updateAllInfo() {
  const allUsers = await User.getAllUsers();
  const allUserIDs = allUsers.map((user) => user["user_id"]);

  allUserIDs.forEach((user_id) => updateUsersInfo(user_id));
}

module.exports = { updateAllInfo, updateAllInfo2 };
