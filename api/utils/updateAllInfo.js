const User = require("../models/User");
const Plant = require("../models/Plant");
const Animal = require("../models/Animal");
const Display = require("../models/Display");

async function updateUsersInfo(user_id) {
  const gardenDisplay = await Display.getMyDisplay(user_id);
  const animals = await Animal.getAllMyAnimals(user_id);
  const plants = await Plant.getAllMyPlants(user_id);

  console.log(animals)
  const calcSoilMoistureReduction = () => {
    const sunIntensity = gameInfo.display["sun_intensity"]
    
  }

  // const soilMoistureReduction =
  // gameInfo.display["sun_intensity"]

  // console.log(gameInfo.display["sun_intensity"]);
}

async function updateAllInfo() {

  const allUsers = await User.getAllUsers();
  const allUserIDs = allUsers.map(user => user["user_id"]);

  allUserIDs.forEach(user_id => updateUsersInfo(user_id))
}

module.exports = updateAllInfo;

