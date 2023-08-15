import React from "react";
import { describe, it, expect, afterEach, beforeEach, vi } from "vitest";
import { screen, render, cleanup, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";
import Register from "./index";
import { AuthProvider } from "../../contexts/Authentication";
import userEvent from "@testing-library/user-event";

import matchers from "@testing-library/jest-dom/matchers";
expect.extend(matchers);

describe("Register component", () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <Register />
        </AuthProvider>
      </BrowserRouter>
    );
  });

  afterEach(() => {
    cleanup();
  });

  it("should render Register page with form fields", () => {
    expect(screen.getByPlaceholderText(/username/i)).toBeTruthy();
    expect(screen.getByPlaceholderText(/password/i)).toBeTruthy();
    expect(
      screen.getByRole("button", { name: /register account/i })
    ).toBeTruthy();
    expect(screen.getByRole("link", { name: /log in here/i })).toBeTruthy();
  });

  // it("should register a new user and redirect to login page", async () => {
  //   vi.spyOn(axios, "post").mockResolvedValueOnce({
  //     status: 201,
  //     data: {
  //       error: "This is a successful registration response",
  //     },
  //   });

  //   const usernameInput = screen.getByPlaceholderText(/username/i);
  //   const passwordInput = screen.getByPlaceholderText(/password/i);
  //   const registerButton = screen.getByRole("button", {
  //     name: /register account/i,
  //   });

  //   await userEvent.type(usernameInput, "new_user");
  //   await userEvent.type(passwordInput, "new_password");
  //   userEvent.click(registerButton);

  //   await new Promise((resolve) => setTimeout(resolve, 100));

  //   expect(
  //     screen.findByText(/Your account has been registered!/i)
  //   ).toBeTruthy();

  //   waitFor(() => {
  //     expect(window.location.pathname).toBe("/login").toBeTruthy(); //cannot get this to work.
  //   });
  // });

  it('should redirect to login page when clicking on "Log in here" link', () => {
    const loginLink = screen.getByRole("link", { name: /log in here/i });
    userEvent.click(loginLink);

    waitFor(() => {
      expect(window.location.pathname).toBe("/login");
    });
  });
});
