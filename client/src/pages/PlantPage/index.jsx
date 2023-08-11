import React, { useState, useEffect } from "react";
import { PlantFilter, PlantCard } from "../../components";
import axios from "axios";

const PlantPage = () => {
  const [plants, setPlants] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); 
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [indoorFilter, setIndoorFilter] = useState(false);
  const [poisonousFilter, setPoisonousFilter] = useState(false);
  const [wateringFilter, setWateringFilter] = useState("");

  useEffect(() => {
    async function loadPlants() {
      const key = "sk-Cbth64d349a84316c1797";
      let url = `https://perenual.com/api/species-list?page=${page}&key=${key}`;
      if (indoorFilter) {
        url += "&indoor=1";
      }
      if (poisonousFilter) {
        url += "&poisonous=NULL";
      }
      if (wateringFilter) {
        url += `&watering=${wateringFilter}`;
      }
      if (searchQuery) {
        url += `&q=${searchQuery}`; 
      }
      const response = await fetch(url);
      const data = await response.json();
      setPlants(data.data);
      setLastPage(data.last_page);
    }

    loadPlants();
  }, [page, indoorFilter, poisonousFilter, wateringFilter, searchQuery]); 

  async function handleAddPlant(plant) {
    const petName = prompt("Enter a pet name for your plant:");

    if (petName) {
      const plantData = {
        plant_name: plant.name,
        perenual_id: plant.id,
        pet_name: petName,    
      };

      const config = {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      };
      
      try {
        const { data } = await axios.post(`${import.meta.env.VITE_SERVER}/plants`, plantData, config);
        console.log(data)
        alert("Plant added successfully!");    
      } catch (error) {
        alert("An error occurred while adding the plant.");
        console.log(error);
      }

      if (response.ok) {
        alert("Plant added successfully!");
      } else {
        alert("An error occurred while adding the plant.");
      }
    }
  }

  function displayPlants() {
    return plants.map((p) => (
      <PlantCard
        key={p.id}
        id={p.id}
        name={p.common_name}
        family={p.scientific_name[0]}
        image={p.default_image ? p.default_image.regular_url : null}
        onAddPlant={handleAddPlant}
      />
    ));
  }

  function nextPage() {
    setPage(page + 1);
    window.scrollTo(0, 0);
  }

  function prevPage() {
    if (page > 1) {
      setPage(page - 1);
      window.scrollTo(0, 0);
    }
  }

  return (
    <main>
      <h1 id="plants">Plants</h1>
      <PlantFilter textFilter={searchQuery} setTextFilter={setSearchQuery} />
      <label>
        Indoor plants only
        <input
          type="checkbox"
          checked={indoorFilter}
          onChange={() => setIndoorFilter(!indoorFilter)}
        />
      </label>
      <label>
      Non-Poisonous Plants Only
        <input
          type="checkbox"
          checked={poisonousFilter}
          onChange={() => setPoisonousFilter(!poisonousFilter)}
        />
      </label>
      <label>
        Watering Frequency
        <select
          value={wateringFilter}
          onChange={(e) => setWateringFilter(e.target.value)}>
          <option value="">Select</option>
          <option value="frequent">Frequent</option>
          <option value="average">Average</option>
          <option value="minimum">Minimum</option>
        </select>
      </label>
      <div className="plant-main">{displayPlants()}</div>
      <div className="pagination">
        <button onClick={prevPage} disabled={page === 1}>
          Previous
        </button>
        <span>Page {page} of {lastPage}</span>
        <button onClick={nextPage} disabled={page === lastPage}>
          Next
        </button>
      </div>
    </main>
  );
};

export default PlantPage;




