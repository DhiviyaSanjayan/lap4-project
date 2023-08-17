import React from "react";
import { describe, it, expect, afterEach, beforeEach } from "vitest";
import { render, cleanup } from "@testing-library/react";
import AddPlant from "./index"; // Assuming AddPlant is in the same folder, if not adjust the path

describe("AddPlant component", () => {
  beforeEach(() => {
    render(<AddPlant />);
  });

  afterEach(() => {
    cleanup();
  });

  it("should render the 'Add your plant' header", () => {
    const header = document.querySelector("h1");
    expect(header).toBeTruthy();
    expect(header.textContent).toBe("Add your plant");
  });

  it("should render the upload input field", () => {
    const uploadInput = document.querySelector('input[type="file"]');
    expect(uploadInput).toBeTruthy();
  });

  it("should render the upload button", () => {
    const uploadButton = document.querySelector('button[type="submit"]');
    expect(uploadButton).toBeTruthy();
    expect(uploadButton.textContent).toBe("Upload");
  });
});
