import React from "react";
import { describe, it, expect, afterEach, beforeEach } from "vitest";
import { render, cleanup } from "@testing-library/react";
import Popup from "./index";

describe("Popup component", () => {
  beforeEach(() => {
    render(<Popup />);
  });

  afterEach(() => {
    cleanup();
  });

  it("should render popup container with display set to none", () => {
    const popupContainer = document.getElementById("pop-up");
    expect(popupContainer).toBeTruthy();
    expect(popupContainer.style.display).toBe("none");
  });
});
