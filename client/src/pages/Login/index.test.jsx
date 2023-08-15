import React from "react";
import { describe, it, expect, afterEach, beforeEach, vi } from "vitest";
import { screen, render, cleanup } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";
import Login from "./index";
import { AuthProvider } from "../../contexts/Authentication";
import userEvent from "@testing-library/user-event";

describe("Login component", () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <Login />
        </AuthProvider>
      </BrowserRouter>
    );
  });

  afterEach(() => {
    cleanup();
  });

  it("should render Login page with form fields", () => {
    expect(screen.getByPlaceholderText(/username/i)).toBeTruthy();
    expect(screen.getByPlaceholderText(/password/i)).toBeTruthy();
    expect(screen.getByRole("button", { name: /login/i })).toBeTruthy();
    expect(screen.getByRole("link", { name: /sign up here/i })).toBeTruthy();
  });

  it("should display an error message on incorrect login", async () => {
    vi.spyOn(axios, "post").mockRejectedValueOnce({
      response: {
        data: {
          error: "Incorrect username or password",
        },
      },
    });

    const usernameInput = screen.getByPlaceholderText(/username/i);
    const passwordInput = screen.getByPlaceholderText(/password/i);
    const loginButton = screen.getByRole("button", { name: /login/i });

    await userEvent.type(usernameInput, "incorrect_username");
    await userEvent.type(passwordInput, "incorrect_password");

    userEvent.click(loginButton);

    const errorElement = screen.findByText("Incorrect username or password");
    expect(errorElement).toBeTruthy();
  });

  // it("should login successfully", async () => {
  //   vi.spyOn(axios, "post").mockResolvedValueOnce({
  //     status: 200,
  //     data: {
  //       token: "fake_token",
  //       user: {
  //         id: 1,
  //         username: "testuser",
  //       },
  //     },
  //   });

  //   const usernameInput = screen.getByPlaceholderText(/username/i);
  //   const passwordInput = screen.getByPlaceholderText(/password/i);
  //   const loginButton = screen.getByRole("button", { name: /login/i });

  //   await userEvent.type(usernameInput, "correct_username");
  //   await userEvent.type(passwordInput, "correct_password");
  //   userEvent.click(loginButton);

  //   await new Promise((resolve) => setTimeout(resolve, 100));
  //   expect(window.location.pathname).toBe("/dashboard");
  // });
});
