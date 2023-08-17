import React from "react";
import { describe, it, expect, afterEach, beforeEach } from "vitest";
import { render, cleanup } from "@testing-library/react";

import PlantFilter from "./index";

describe("PlantFilter component", () => {
  beforeEach(() => {
    render(<PlantFilter textFilter="" setTextFilter={() => {}} />);
  });

  afterEach(() => {
    cleanup();
  });

  it("should render a search input", () => {
    const searchInput = document.querySelector(
      'input[placeholder="Search plants"]'
    );
    expect(searchInput).toBeTruthy();
  });
});
