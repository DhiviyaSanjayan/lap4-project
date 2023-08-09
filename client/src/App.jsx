import { Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";

import {
  Login,
  Register,
  Dashboard,
  Profile,
  NotFound,
  GetStarted,
  AddPlant
} from "./pages";

import { AuthProvider } from "./contexts";
import { Welcome, User } from "./layouts";

import { Popup } from "./components";

import "./App.css";

function App() {
  return (
    <>
      <AuthProvider>
        <Routes>
          <Route element={<Welcome />}>
            <Route path="/" element={<GetStarted />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/addplant" element={<AddPlant />} />
          </Route>
          <Route element={<User />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
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
