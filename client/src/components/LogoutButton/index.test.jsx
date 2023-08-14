import React from "react";
import { describe, it, expect, afterEach, beforeEach, vi } from "vitest";
import { render, cleanup } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import LogoutButton from "./index";
import { AuthProvider } from "../../contexts/Authentication";

describe("LogoutButton component", () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <LogoutButton />
        </AuthProvider>
      </BrowserRouter>
    );
  });

  afterEach(() => {
    cleanup();
  });

  it("should render a Logout button", () => {
    const logoutButton = document.querySelector("button");
    expect(logoutButton).toBeTruthy();
    expect(logoutButton.textContent).toBe("Logout");
  });
});
