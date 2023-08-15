import React, { useState, useContext, useEffect } from "react";
import style from "./style.module.css";
import { useAuth, useGarden } from "../../contexts";
import CountdownTimer from "../../components/Timer";
import axios from "axios";

export default function Garden() {
  const { user } = useAuth();
  const { display, setDisplay, plant, setPlant, animal, setAnimal } =
    useGarden();
  const token = localStorage.getItem("token");

  const [userDetails, setUserDetails] = useState(null);
  const [showAnimalDropdown, setShowAnimalDropdown] = useState(false);
  const [myAnimals, setMyAnimals] = useState([]);
  const [selectedAnimalType, setSelectedAnimalType] = useState(null);

  const config = {
    headers: {
      Authorization: token,
    },
  };

  async function plantAction(plantObj, action) {
    
    //on button click will pass in 'water' or 'fertilise' as args

    try {
      //Update the state of the React App
      const satisfaction = 100;

      // find out user is watering or fertilising the plant
      const updatedPlantObj =
        action === "water"
          ? { ...plantObj, soil_moisture: satisfaction }
          : { ...plantObj, soil_fertility: satisfaction };

      const updatedPlants = plant.map((p) =>
        p.plant_id === updatedPlantObj.plant_id ? updatedPlantObj : p
      );
      setPlant(updatedPlants);

      // Update the DB with a patch request
      const apiURL = `${import.meta.env.VITE_SERVER}/plants/${
        plantObj.plant_id
      }`;
      const headers = {
        Authorization: token,
        "Content-Type": "application/json",
      };

      // find out user is watering or fertilising the plant
      const body =
        action === "water"
          ? JSON.stringify({ soil_moisture: satisfaction })
          : JSON.stringify({ soil_fertility: satisfaction });

      const response = await fetch(apiURL, {
        method: "PATCH",
        headers: headers,
        body: body,
      });

      if (!response.ok) {
        console.error(`Failed to update plant ${action} satisfaction`);
        return;
      }
      console.log(`Plant ${action} satisfaction updated successfully`);
    } catch (error) {
      console.error(
        `Error while updating plant ${action} satisfaction:`,
        error
      );
    }
  }

  async function fetchMyAnimals() {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER}/animals`,
        { headers: { Authorization: token } }
      );

      setMyAnimals(response.data);
      setShowAnimalDropdown(true);
    } catch (error) {
      console.error("An error occurred while fetching animals:", error);
    }
  }

  useEffect(() => {
    async function fetchUserDetails() {
      try {
        const response = await axios.get(`${import.meta.env.VITE_SERVER}/users/details`, config);
        setUserDetails(response.data);
      } catch (error) {
        console.error("An error occurred while fetching user details:", error);
      }
    }

    fetchUserDetails();
  }, [token]);

  async function buyFood() {
    if (!userDetails || userDetails.coins < 200) {
      alert("You do not have enough coins to buy food.");
      return;
    }

    const confirmation = confirm("The food costs 200 coins. Do you want to continue?");
    if (!confirmation) {
      return;
    }  
  
    // Find the selected animal based on the selected animal type
    const selectedAnimal = myAnimals.find(
      (animal) => animal.animal_type === selectedAnimalType
    );
  
    if (!selectedAnimal) {
      alert("Please select an animal from the dropdown.");
      return;
    }
  
    let newWellBeing = selectedAnimal.wellbeing + 20;
    newWellBeing = Math.min(newWellBeing, 100);
  
    try {
      await axios.patch(
        `${import.meta.env.VITE_SERVER}/users/update`,
        { coins: userDetails.coins - 200 },
        config
      );
  
      await axios.patch(
        `${import.meta.env.VITE_SERVER}/animals/${selectedAnimal.animal_id}`,
        { wellbeing: newWellBeing },
        config
      );
  
      // Update the state of the animals in the garden
      const updatedAnimals = animal.map((a) =>
        a.id === selectedAnimal.id ? { ...a, wellbeing: newWellBeing } : a
      );
      setAnimal(updatedAnimals);
      setMyAnimals(updatedAnimals);

      setUserDetails({
        ...userDetails,
        coins: userDetails.coins - 200,
      });
  
      alert("Food purchased successfully!");
    } catch (error) {
      alert("An error occurred while buying food.");
      console.log(error);
    }
  }
  
  const pData = {
    creation_date: "2023-08-15T00:02:59.646Z",
    perenual_id: 1,
    pet_name: "Steven",
    pic_filename: "cartoon--rose.png",
    plant_beauty: 1,
    plant_exp: 0,
    plant_id: 1,
    plant_name: "European Silver Fir",
    soil_fertility: 50,
    soil_moisture: 50,
    user_id: 1,
    wellbeing: 100,
  };

  return (
    <div className={style["outer-container"]}>
      <main className={style["inner-container"]}>
        <h1>This is your virtual garden</h1>
        <CountdownTimer plant={plant} setPlant={setPlant} />
        <h2>Garden Object</h2>
        <div>
          {display && (
            <div>
              {Object.entries(display).map(([key, value]) => (
                <p key={key}>
                  {key}: {value}
                </p>
              ))}
            </div>
          )}
        </div>
        <h2>Plant Array</h2>
        <div>
          {plant &&
            plant.map((plantObj, index) => (
              <div key={index}>
                {Object.entries(plantObj).map(([key, value]) => (
                  <p key={key}>
                    {key}: {value}
                  </p>
                ))}
                <button onClick={() => plantAction(plantObj, 'water')}>
                  Water
                </button>
                &nbsp;&nbsp;
                <button onClick={() => plantAction(plantObj, 'fertilise')}>
                  Fertilise
                </button>
              </div>
            ))}
        </div>
        <h2>Animal Object</h2>
        <div>
          {animal &&
            animal.map((animalObj, index) => (
              <div key={index}>
                {Object.entries(animalObj).map(([key, value]) => (
                  <p key={key}>
                    {key}: {value}
                  </p>
                ))}                
              </div>
            ))}
        </div>
        <button onClick={fetchMyAnimals}>Feed My Animals</button>
        {showAnimalDropdown && (
        <div>
          <select onChange={(e) => setSelectedAnimalType(e.target.value)}>
            <option value="" disabled selected>
              Select an Animal
            </option>
            {myAnimals.map((animalObj, index) => (
              <option key={index} value={animalObj.animal_type}>
                {animalObj.animal_type}
              </option>
            ))}
          </select>
          <button onClick={buyFood}>Buy Food</button>
        </div>
      )}
      </main>
    </div>
  );
}

// import React, { useState, useContext, useEffect } from "react";
// import style from "./style.module.css";
// import { useAuth, useGarden } from "../../contexts";
// import CountdownTimer from "../../components/Timer";
// import axios from "axios";

// export default function Garden() {
//   const { user } = useAuth();
//   const { display, setDisplay, plant, setPlant, animal, setAnimal } =
//     useGarden();
//   const token = localStorage.getItem("token");

//   const [userDetails, setUserDetails] = useState(null);
//   const [showAnimalDropdown, setShowAnimalDropdown] = useState(false);
//   const [myAnimals, setMyAnimals] = useState([]);
//   const [selectedAnimalType, setSelectedAnimalType] = useState(null);

//   const config = {
//     headers: {
//       Authorization: token,
//     },
//   };

//   async function plantAction(plantObj, action) {

//     //on button click will pass in 'water' or 'fertilise' as args

//     try {
//       //Update the state of the React App
//       const satisfaction = 100;

//       // find out user is watering or fertilising the plant
//       const updatedPlantObj =
//         action === "water"
//           ? { ...plantObj, soil_moisture: satisfaction }
//           : { ...plantObj, soil_fertility: satisfaction };

//       const updatedPlants = plant.map((p) =>
//         p.plant_id === updatedPlantObj.plant_id ? updatedPlantObj : p
//       );
//       setPlant(updatedPlants);

//       // Update the DB with a patch request
//       const apiURL = `${import.meta.env.VITE_SERVER}/plants/${
//         plantObj.plant_id
//       }`;
//       const headers = {
//         Authorization: token,
//         "Content-Type": "application/json",
//       };

//       // find out user is watering or fertilising the plant
//       const body =
//         action === "water"
//           ? JSON.stringify({ soil_moisture: satisfaction })
//           : JSON.stringify({ soil_fertility: satisfaction });

//       const response = await fetch(apiURL, {
//         method: "PATCH",
//         headers: headers,
//         body: body,
//       });

//       if (!response.ok) {
//         console.error(`Failed to update plant ${action} satisfaction`);
//         return;
//       }
//       console.log(`Plant ${action} satisfaction updated successfully`);
//     } catch (error) {
//       console.error(
//         `Error while updating plant ${action} satisfaction:`,
//         error
//       );
//     }
//   }

//   async function fetchMyAnimals() {
//     try {
//       const response = await axios.get(
//         `${import.meta.env.VITE_SERVER}/animals`,
//         { headers: { Authorization: token } }
//       );

//       setMyAnimals(response.data);
//       setShowAnimalDropdown(true);
//     } catch (error) {
//       console.error("An error occurred while fetching animals:", error);
//     }
//   }

//   useEffect(() => {
//     async function fetchUserDetails() {
//       try {
//         const response = await axios.get(`${import.meta.env.VITE_SERVER}/users/details`, config);
//         setUserDetails(response.data);
//       } catch (error) {
//         console.error("An error occurred while fetching user details:", error);
//       }
//     }

//     fetchUserDetails();
//   }, [token]);

//   async function buyFood() {
//     if (!userDetails || userDetails.coins < 200) {
//       alert("You do not have enough coins to buy food.");
//       return;
//     }

//     const confirmation = confirm("The food costs 200 coins. Do you want to continue?");
//     if (!confirmation) {
//       return;
//     }

//     // Find the selected animal based on the selected animal type
//     const selectedAnimal = myAnimals.find(
//       (animal) => animal.animal_type === selectedAnimalType
//     );

//     if (!selectedAnimal) {
//       alert("Please select an animal from the dropdown.");
//       return;
//     }

//     let newWellBeing = selectedAnimal.wellbeing + 20;
//     newWellBeing = Math.min(newWellBeing, 100);

//     try {
//       await axios.patch(
//         `${import.meta.env.VITE_SERVER}/users/update`,
//         { coins: userDetails.coins - 200 },
//         config
//       );

//       await axios.patch(
//         `${import.meta.env.VITE_SERVER}/animals/${selectedAnimal.animal_id}`,
//         { wellbeing: newWellBeing },
//         config
//       );

//       // Update the state of the animals in the garden
//       const updatedAnimals = animal.map((a) =>
//         a.id === selectedAnimal.id ? { ...a, wellbeing: newWellBeing } : a
//       );
//       setAnimal(updatedAnimals);
//       setMyAnimals(updatedAnimals);

//       setUserDetails({
//         ...userDetails,
//         coins: userDetails.coins - 200,
//       });

//       alert("Food purchased successfully!");
//     } catch (error) {
//       alert("An error occurred while buying food.");
//       console.log(error);
//     }
//   }

//   return (
//     <div className={style["outer-container"]}>
//       <main className={style["inner-container"]}>
//         <h1>This is your virtual garden</h1>
//         <CountdownTimer plant={plant} setPlant={setPlant} />
//         <h2>Garden Object</h2>
//         <div>
//           {display && (
//             <div>
//               {Object.entries(display).map(([key, value]) => (
//                 <p key={key}>
//                   {key}: {value}
//                 </p>
//               ))}
//             </div>
//           )}
//         </div>
//         <h2>Plant Array</h2>
//         <div>
//           {plant &&
//             plant.map((plantObj, index) => (
//               <div key={index}>
//                 {Object.entries(plantObj).map(([key, value]) => (
//                   <p key={key}>
//                     {key}: {value}
//                   </p>
//                 ))}
//                 <button onClick={() => plantAction(plantObj, 'water')}>
//                   Water
//                 </button>
//                 &nbsp;&nbsp;
//                 <button onClick={() => plantAction(plantObj, 'fertilise')}>
//                   Fertilise
//                 </button>
//               </div>
//             ))}
//         </div>
//         <h2>Animal Object</h2>
//         <div>
//           {animal &&
//             animal.map((animalObj, index) => (
//               <div key={index}>
//                 {Object.entries(animalObj).map(([key, value]) => (
//                   <p key={key}>
//                     {key}: {value}
//                   </p>
//                 ))}
//               </div>
//             ))}
//         </div>
//         <button onClick={fetchMyAnimals}>Feed My Animals</button>
//         {showAnimalDropdown && (
//         <div>
//           <select onChange={(e) => setSelectedAnimalType(e.target.value)}>
//             <option value="" disabled selected>
//               Select an Animal
//             </option>
//             {myAnimals.map((animalObj, index) => (
//               <option key={index} value={animalObj.animal_type}>
//                 {animalObj.animal_type}
//               </option>
//             ))}
//           </select>
//           <button onClick={buyFood}>Buy Food</button>
//         </div>
//       )}
//       </main>
//     </div>
//   );
// }
