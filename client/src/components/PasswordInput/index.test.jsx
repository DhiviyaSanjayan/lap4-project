import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, afterEach, beforeEach, vi } from "vitest";
import PasswordInput from "./index";

describe("PasswordInput component", () => {
  it("should toggle password visibility", () => {
    const { container } = render(<PasswordInput />);

    const toggleButton = container.querySelector("._password-toggler_4b1f1a");
    expect(toggleButton).toBeTruthy();

    fireEvent.click(toggleButton);

    const passwordInput = container.querySelector("input[name='password']");
    expect(passwordInput.type).toBe("text");

    fireEvent.click(toggleButton);

    expect(passwordInput.type).toBe("password");
  });

  it("should toggle password visibility", () => {
    const { container } = render(<PasswordInput />);

    const toggleButton = container.querySelector("._password-toggler_4b1f1a");
    expect(toggleButton).toBeTruthy();

    const passwordInput = container.querySelector("input[name='password']");
    expect(passwordInput.type).toBe("password");

    fireEvent.click(toggleButton);

    expect(passwordInput.type).toBe("text");

    fireEvent.click(toggleButton);

    expect(passwordInput.type).toBe("password");
  });
});
