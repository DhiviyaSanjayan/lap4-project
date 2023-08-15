import { Routes, Route, Navigate, Outlet } from "react-router-dom";

import {
  Login,
  Register,
  Profile,
  NotFound,
  PlantPage,
  AddPlant,
  Garden,
  PlantIdentifier,
} from "./pages";

import { AuthProvider, GardenProvider } from "./contexts";
import { Guest, User } from "./layouts";

import { Popup } from "./components";

import "./App.css";

function GardenRoute() {
  return (
    <GardenProvider>
      <Routes>
        <Route path="/" element={<Garden />} />
      </Routes>
    </GardenProvider>
  );
}

function App() {
  return (
    <>
      <AuthProvider>
        <Routes>
          <Route element={<Guest />}>
            <Route path="/" element={<Outlet />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
          <Route element={<User />}>
            <Route path="/addplant" element={<AddPlant />} />
            <Route path="/plant-identifier" element={<PlantIdentifier />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/plants" element={<PlantPage />} />
            <Route path="/garden/*" element={<GardenRoute />} />
            <Route path="/addplant" element={<AddPlant />} />
            <Route path="*" element={<NotFound />} />
          </Route>
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
        <Popup />
      </AuthProvider>
    </>
  );
}

export default App;
