import React from "react";
import { usePlantFilters } from "../../contexts";
import trefleFetch from "../../utils/trefleFetch";

export default function FetchResultButton() {
  const { flowerColors, setFilterResults } = usePlantFilters();

  async function queryBuilder() {
      const fcFilterString = `[flower_color]=${flowerColors}`;
      
      
    setFilterResults((await trefleFetch(`/species?filter${fcFilterString}`)).data);
  }

  return <button onClick={() => queryBuilder()}>Fetch Data</button>;
}
