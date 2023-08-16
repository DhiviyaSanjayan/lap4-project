import React, { useState, useContext, useEffect } from "react";
import { GardenProvider, useGarden } from "./contexts";
import styles from "./style.module.css";
import { Box, Options, Nav } from "./components";

export default function Garden() {
  return (
    <GardenProvider>
      <main className={styles["container"]}>
        <Box />
        <Nav />
        <Options />
      </main>
    </GardenProvider>
  );
}

// <div className={style["outer-container"]}>
// <Plant {...{pData}} />
// </div>

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
