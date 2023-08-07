import React, { useState } from "react";
import { screen, render, cleanup } from "@testing-library/react";
import { expect, beforeEach, afterEach, describe, it, vi } from "vitest";
import matchers from "@testing-library/jest-dom/matchers";
import userEvent from "@testing-library/user-event";

expect.extend(matchers);

import DeleteAccount from ".";
import { getAuthenticated } from "../../test/helpers";

describe("DeleteAccount component", () => {
    
  beforeAll(() => {
    getAuthenticated();
  });

  afterAll(() => {
    cleanup();
    removeAccount();
    vi.restoreAllMocks(); // Restore all mocked functions after each test
  });

  it("renders without crashing", async () => {
    render(
      <DeleteAccount />
    );
  });

  // it("removes registered account", async () => {
  //   render(
  //     <DeleteAccount />
  //   );
  //   const button = screen.getByTestId("delete");
  //   await userEvent.click(button);
  // });
});
