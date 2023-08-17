import React from "react";
import { describe, it, expect, afterEach, beforeEach } from "vitest";
import { render, cleanup } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import GetStarted from "./index"; // Make sure the path is correct
import { AuthProvider } from "../../../../contexts/Authentication"; // Adjust the path if needed

describe("GetStarted component", () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <GetStarted />
        </AuthProvider>
      </BrowserRouter>
    );
  });

  afterEach(() => {
    cleanup();
  });

  it("should render the 'Click to Start Gardening' text", () => {
    const getStartedText = document.querySelector("p");
    expect(getStartedText).toBeTruthy();
    expect(getStartedText.textContent).toContain("Click to Start Gardening");
  });
});
