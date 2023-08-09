import React, { useState, useEffect } from "react";
import { PlantFilter, PlantCard } from "../../components";

const PlantPage = () => {
  const [plants, setPlants] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); 
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [indoorFilter, setIndoorFilter] = useState(false);

  useEffect(() => {
    async function loadPlants() {
      const key = "sk-jb0464d232be4bbc31798";
      let url = `https://perenual.com/api/species-list?page=${page}&key=${key}`;
      if (indoorFilter) {
        url += "&indoor=1";
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
  }, [page, indoorFilter, searchQuery]); 

  function displayPlants() {
    return plants.map((p) => (
      <PlantCard
        key={p.id}
        id={p.id}
        name={p.common_name}
        family={p.scientific_name[0]}
        image={p.default_image ? p.default_image.regular_url : null}
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




