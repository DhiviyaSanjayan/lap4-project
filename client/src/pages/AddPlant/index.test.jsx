import React from "react";
import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import AddPlant from "./index";

describe("AddPlant component", () => {
  beforeEach(() => {
    render(<AddPlant />);
  });

  afterEach(() => {
    // Cleanup if needed
  });

  it("should render 'Name:' label", () => {
    const nameLabel = screen.queryByText(/Name:/i);
    expect(nameLabel).not.toBeNull();
  });

  it("should render 'Species:' label", () => {
    const speciesLabels = screen.queryAllByText(/Species:/i);
    const nonNullSpeciesLabel = speciesLabels.find((label) => label !== null);
    expect(nonNullSpeciesLabel).not.toBeNull();
  });

  it("should render 'Upload Image:' label", () => {
    const uploadLabels = screen.queryAllByText(/Upload Image:/i);
    const nonNullUploadLabel = uploadLabels.find((label) => label !== null);
    expect(nonNullUploadLabel).not.toBeNull();
  });
});
