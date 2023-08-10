import React from "react";

const PlantFilter = ({ textFilter, setTextFilter }) => {
  function updateTextFilter(e) {
    setTextFilter(e.target.value);
  }

  return (
    <div className="plant-filters">
      <label>
        <input
          type="text"
          value={textFilter}
          onChange={updateTextFilter}
          placeholder="Search plants"
        />
      </label>
    </div>
  );
};

export default PlantFilter;
