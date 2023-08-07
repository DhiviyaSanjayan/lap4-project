import React from "react";
import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import matchers from "@testing-library/jest-dom/matchers"; // Import Jest matchers
expect.extend(matchers);

import UsernameInput from ".";

describe("UsernameInput component", () => {
  beforeEach(() => {
    render(<UsernameInput />);
  });

  afterEach(() => {
    cleanup();
  });

  it("has the correct className", () => {
    const inputElement = screen.getByPlaceholderText("Username");
    console.log(inputElement);
    expect(inputElement).toHaveClass("_input_419933");
  });

  it("has the correct type attribute", () => {
    const inputElement = screen.getByPlaceholderText("Username");
    expect(inputElement).toHaveAttribute("type", "text");
  });

  it("has the correct name attribute", () => {
    const inputElement = screen.getByPlaceholderText("Username");
    expect(inputElement).toHaveAttribute("name", "username");
  });

  it("has the correct autoComplete attribute", () => {
    const inputElement = screen.getByPlaceholderText("Username");
    expect(inputElement).toHaveAttribute("autoComplete", "off");
  });

  it("is a required field", () => {
    const inputElement = screen.getByPlaceholderText("Username");
    expect(inputElement).toBeRequired();
  });
});
