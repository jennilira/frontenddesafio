import React from "react";
import Sidebar from "../Sidebar/Sidebar";
import Example from "../Modal/modal";
import "./MainLayout.css";
import ListPatients from "../../../components/TablesList/listPatients/ListPatients";
import Header from "../Header/Header";
import Atendimento from "../Atendimento/Atendimento/InfoAtendimento";
import FormExample from "../Atendimento/Atendimento/Formatendimento";
import { Route, Routes } from "react-router-dom";
import FormAtendimento from "../Atendimento/Atendimento/Formatendimento";
import AtendimentoPage from "../../../pages/Atendimento";
import Home from "../../../pages/Home";
import Footer from "../Footer/Footer";

function Mainlayout() {
  return (
    <div className="tudo">
      <Sidebar />
      <div className="main">
        <Header />

        <div className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/atendimento/:id" element={<AtendimentoPage />} />
          </Routes>
        </div>

        <Footer />
      </div>
    </div>
  );
}

export default Mainlayout;
