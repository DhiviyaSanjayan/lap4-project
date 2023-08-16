import React from "react";
import {
  render,
  screen,
  fireEvent,
  test,
  expect,
  beforeEach,
  afterEach,
} from "vitest";
import DeleteAccount from "./index";
import { AuthProvider } from "../../contexts";
import { MemoryRouter } from "react-router-dom";
import axios from "axios";

// Backups for restoration after tests
let originalDelete = axios.delete;
let originalConfirm = window.confirm;

beforeEach(() => {
  // Mock axios delete method
  axios.delete = () => Promise.resolve({ status: 200 });

  // Mock window confirm to always return true
  window.confirm = () => true;

  localStorage.clear();
});

afterEach(() => {
  // Restore the original methods after each test
  axios.delete = originalDelete;
  window.confirm = originalConfirm;
});

test("should display confirmation and delete account on confirm", async () => {
  const { container } = render(
    <MemoryRouter>
      <AuthProvider>
        <DeleteAccount />
      </AuthProvider>
    </MemoryRouter>
  );

  const deleteBtn = screen.getByTestId("delete");
  fireEvent.click(deleteBtn);

  expect(window.confirm).toHaveBeenCalled();
  expect(localStorage.removeItem).toHaveBeenCalledWith("token");
  expect(container).toHaveTextContent("Delete Account");
});

test("should not delete the account if confirmation is denied", async () => {
  window.confirm = () => false;

  render(
    <MemoryRouter>
      <AuthProvider>
        <DeleteAccount />
      </AuthProvider>
    </MemoryRouter>
  );

  const deleteBtn = screen.getByTestId("delete");
  fireEvent.click(deleteBtn);

  expect(window.confirm).toHaveBeenCalled();
  expect(axios.delete).not.toHaveBeenCalled();
});
