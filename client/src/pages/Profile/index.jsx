// import React, { useState, useEffect } from "react";
// import fetchAllUserInfo from "../../utils/fetchAllUserInfo";
// import { ReactComponent as Flower } from "../../assets/images/profile_flower.svg";
// import { LogoutButton, DeleteAccount } from "../../components";

// import style from "./style.module.css";

// export default function Profile() {
//   const [userInfo, setUserInfo] = useState();

//   useEffect(() => {
//     (async () => {
//       setUserInfo(await fetchAllUserInfo());
//     })();
//   }, []);

//   return (
//     <>
//       <div className={style["outer-container"]}>
//         <Flower />
//         {userInfo && (
//           <main id="profile" className={style["container"]}>
//             <div className={style["tags"]}>
//               <span>
//                 plant
//                 <br />
//                 count
//               </span>
//               <span>coins</span>
//               <span>experience</span>
//               <span>user</span>
//             </div>
//             <div id="account-info" className={style["account-info"]}>
//               <p>{userInfo.user.username}'s Account</p>
//               <p>
//                 User Since:{" "}
//                 {new Date(userInfo.user.creation_date).toLocaleDateString()}
//               </p>
//             </div>
//             <div>
//               <p id="flower-count" className={style["flower-count"]}>
//                 {userInfo.plants.length}
//               </p>
//             </div>

//             <div>
//               <p id="coins" className={style["coins"]}>
//                 {userInfo.user.coins}
//               </p>
//             </div>
//             <div>
//               <p id="user-exp" className={style["user-exp"]}>
//                 <span>{userInfo.user.exp}</span>
//               </p>
//             </div>
//             <LogoutButton />
//             <DeleteAccount />
//           </main>
//         )}
//       </div>
//     </>
//   );
// }

// //just for Anastasia
// // import React from "react";
// // import { describe, it, expect, beforeAll, afterAll, vi } from "vitest";
// // import { render, cleanup } from "@testing-library/react";
// // import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// // import matchers from "@testing-library/jest-dom/matchers";
// // expect.extend(matchers);

// // import { MockAuthProvider } from "./MockAuthContext";
// // import Profile from ".";

// // describe("Profile Page", () => {
// //   beforeAll(() => {
// //     // Any setup you need before tests run
// //   });

// //   afterAll(() => {
// //     cleanup();
// //     vi.restoreAllMocks();
// //   });

// //   it("renders without crashing", async () => {
// //     render(
// //       <Router>
// //         <MockAuthProvider>
// //           <Routes>
// //             <Route path="/" element={<Profile />} />
// //           </Routes>
// //         </MockAuthProvider>
// //       </Router>
// //     );
// //   });
// // });

import React from "react";
import { screen, render, waitFor } from "@testing-library/react";
import Profile from "./index";

// Mock data
const mockData = {
  user: {
    username: "testUser",
    coins: 100,
    exp: 50,
    creation_date: new Date().toISOString(),
  },
  plants: [1, 2, 3], // Represents 3 plants.
};

// Mock fetchAllUserInfo utility
const mockFetchAllUserInfo = async () => mockData;
require.cache.set("../../utils/fetchAllUserInfo", {
  default: mockFetchAllUserInfo,
});

describe("Profile Component", () => {
  it("should render user info correctly", async () => {
    render(<Profile />);

    // Wait for the user info to be fetched and state to be set
    await waitFor(() => screen.getByText("testUser's Account"));

    // Check that the mock data is rendered correctly
    expect(screen.getByText("testUser's Account")).toBeVisible();
    expect(
      screen.getByText(`User Since: ${new Date().toLocaleDateString()}`)
    ).toBeVisible();
    expect(screen.getByText("3")).toBeVisible(); // plant count
    expect(screen.getByText("100")).toBeVisible(); // coins
    expect(screen.getByText("50")).toBeVisible(); // experience
  });
});
