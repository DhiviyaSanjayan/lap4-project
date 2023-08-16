// import React from "react";
// import { describe, it, expect, afterEach, beforeEach, vi } from "vitest";
// import { screen, render, cleanup } from "@testing-library/react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// import { Popup } from "../../components";
// import { MockAuthProvider } from "./MockAuthContext";

// import Profile from ".";

// describe("Profile Page", () => {
//   beforeEach(() => {
//     render(
//       <Router>
//         <MockAuthProvider>
//           <Routes>
//             <Route path="/" element={<Profile />} />
//           </Routes>
//           <Popup />
//         </MockAuthProvider>
//       </Router>
//     );
//   });

//   afterEach(() => {
//     cleanup();
//     removeAccount();
//     vi.restoreAllMocks(); // Restore all mocked functions after each test
//   });

//   it("renders without crashing", () => {
//     // Add checks to ensure expected elements on Profile page are rendered.
//     // For example, if the Profile page has a heading "User Profile", you could do:
//     expect(screen.getByText(/user profile/i)).toBeTruthy();
//     // Add other checks as needed based on your Profile component's structure.
//   });
// });
