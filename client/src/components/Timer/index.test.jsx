import React from "react";
import { describe, it, expect, afterEach, beforeEach } from "vitest";
import { render, cleanup, screen } from "@testing-library/react";
import CountdownTimer from "./index";
import matchers from "@testing-library/jest-dom/matchers";
expect.extend(matchers);

describe("CountdownTimer component", () => {
  let originalInterval;

  beforeEach(() => {
    originalInterval = window.setInterval;
    window.setInterval = () => {};
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
});
