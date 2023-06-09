import React from "react";
import { Route, Routes } from "react-router-dom";

import "./App.css";

// import Sidebar from './assets/layouts/Sidebar/Sidebar';
// import Example from './assets/layouts/Modal/modal';
import Mainlayout from "./assets/layouts/Mainlayout/MainLayout";
import ListPatients from "./components/TablesList/listPatients/ListPatients";
import Home from "./pages/Home";

function App() {
  return (
    <div>
      <Mainlayout />

    </div>
  );
}

export default App;
