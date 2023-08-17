import React from "react";
import { describe, it, expect, afterEach, beforeEach } from "vitest";
import { render, cleanup } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "../../../../contexts";
import Backgrounds from "./index";

describe("Backgrounds component", () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <Backgrounds />
        </AuthProvider>
      </BrowserRouter>
    );
  });

  afterEach(() => {
    cleanup();
  });

  it("should render the LivingRoom SVG", () => {
    const livingRoomSVG = document.querySelector("svg");
    expect(livingRoomSVG).toBeTruthy();
  });
});
