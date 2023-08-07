import React from "react";
import { describe, it, expect, beforeAll, afterAll, vi } from "vitest";
import { screen, render, cleanup, within } from "@testing-library/react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import matchers from "@testing-library/jest-dom/matchers";
expect.extend(matchers);

import {
  getAuthenticated,
  removeAccount,
} from "../../test/helpers";
import { AuthProvider } from "../../contexts";
import { Popup } from "../../components";

import GetStarted from ".";

describe("GetStarted Page", () => {
  beforeAll(() => {
    getAuthenticated();
  });

  afterAll(() => {
    cleanup();
    removeAccount();
    vi.restoreAllMocks(); // Restore all mocked functions after each test
  });

  it("renders without crashing", async () => {
    render(
      <Router>
          <AuthProvider>
            <Routes>
              <Route path="/" element={<GetStarted />} />
            </Routes>
            <Popup />
          </AuthProvider>
      </Router>
    );
  });
});
