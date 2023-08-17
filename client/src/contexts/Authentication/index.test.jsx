import React from "react";
import { describe, it, expect, afterEach, beforeEach, vi } from "vitest";
import { render, cleanup } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./index";

describe("Authentication component", () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <div>Test Child</div>{" "}
          {/* This is a dummy child component for testing purposes */}
        </AuthProvider>
      </BrowserRouter>
    );
  });

  afterEach(() => {
    cleanup();
  });

  it("should render without crashing", () => {
    const testChild = document.querySelector("div");
    expect(testChild).toBeTruthy();
    expect(testChild.textContent).toBe("Test Child ");
  });
});
