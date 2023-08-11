import React from "react";
import { usePlantFilters } from "../../contexts";
import trefleFetch from "../../utils/trefleFetch";

export default function FetchResults() {
  const {
    flowerColors,
    foliageColors,
    foliageTextures,
    setFilterResults,
  } = usePlantFilters();

  async function queryBuilder() {
    let allFiltersString = [
      flowerColors.length > 0 ? `[flower_color]=${flowerColors}` : "",
      foliageColors.length > 0 ? `[foliage_color]=${foliageColors}` : "",
      foliageTextures.length > 0 ? `[foliage_texture]=${foliageTextures}` : "",
    ];

    allFiltersString = allFiltersString.filter(Boolean);
    const data = (
      await trefleFetch(`/species?filter${allFiltersString.join("&")}`)
    ).data;

    const plantIDs = data.map(entry => entry["id"])
    
    const d = await trefleFetch(`/species/${plantIDs[0]}`)

    console.log(d);
    setFilterResults(
      (await trefleFetch(`/species?filter${allFiltersString.join("&")}`)).data
    );
  }

  return <button onClick={() => queryBuilder()}>Fetch Data</button>;
}
