import React from "react";
import { usePlantFilters } from "../../contexts";
import fetchResults from "../../utils/fetchResults";

export default function FetchButton() {
  const data = usePlantFilters();
  const { setFilterResults } = data;
  return (
    <button onClick={async () => setFilterResults(await fetchResults(data))}>
      Fetch Data
    </button>
  );
}
