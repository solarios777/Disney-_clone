import { useState } from "react";

import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  NavLink,
  RouterProvider,
} from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import Login from "./components/Login";
import Header from "./components/Header";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Header />}>
      <Route path="/" element={<Login />}></Route>
      <Route path="/home" element={<Home />}></Route>
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
