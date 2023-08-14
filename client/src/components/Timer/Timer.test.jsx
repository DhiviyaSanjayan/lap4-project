import React from "react";
import { describe, it, expect, afterEach, beforeEach } from "vitest";
import { render, cleanup, screen } from "@testing-library/react";
import CountdownTimer from "./index";
import matchers from "@testing-library/jest-dom/matchers";
import { waitFor } from "@testing-library/react"; // Import waitFor
expect.extend(matchers);

describe("CountdownTimer component", () => {
  let originalInterval;

  beforeEach(() => {
    // Mocking setInterval to avoid actual interval execution
    originalInterval = window.setInterval;
    window.setInterval = () => {}; // Mocking setInterval
  });

  afterEach(() => {
    window.setInterval = originalInterval;
    cleanup();
  });

  it("should render CountdownTimer component", () => {
    render(<CountdownTimer />);
    const countdownElement = screen.getByText(/Time remaining:/i);
    expect(countdownElement).toBeTruthy();
  });

  it("should display correct initial time", () => {
    render(<CountdownTimer />);
    const countdownElement = screen.getByText(/Time remaining: 00:00:10/i);
    expect(countdownElement).toBeTruthy();
  });

  //   it("should update countdown correctly after one second", async () => {
  //     render(<CountdownTimer />);

  //     const countdownElement = await screen.queryByText(/Time remaining:/);
  //     expect(countdownElement).toBeTruthy();

  //     const textContent = countdownElement.textContent;
  //     expect(textContent).toContain("Time remaining:");
  //     expect(textContent).toContain("00:00:09");
  //   });

  // You can add more test cases for the CountdownTimer component here
});
