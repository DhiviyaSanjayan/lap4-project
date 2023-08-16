import React from "react";
import { describe, it, expect, beforeAll, afterAll, vi } from "vitest";
import { render, cleanup } from "@testing-library/react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import matchers from "@testing-library/jest-dom/matchers";
expect.extend(matchers);

import { MockAuthProvider } from "./MockAuthContext";
import Dashboard from ".";

describe("Dashboard Page", () => {
  beforeAll(() => {
    // Any setup you need before tests run
  });

  afterAll(() => {
    cleanup();
    vi.restoreAllMocks(); // Restore all mocked functions after each test
  });

  it("renders without crashing", async () => {
    render(
      <Router>
        <MockAuthProvider>
          <Routes>
            <Route path="/" element={<Dashboard />} />
          </Routes>
        </MockAuthProvider>
      </Router>
    );
  });
});
