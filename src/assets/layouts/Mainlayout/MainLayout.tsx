import React from "react";
import Sidebar from "../Sidebar/Sidebar";
import Example from "../Modal/modal";
import "./MainLayout.css";
import ListPatients from "../../../components/TablesList/listPatients/ListPatients";
import Header from "../Header/Header";
import Atendimento from "../Atendimento/ListaAtendimento/InfoAtendimento";
import FormExample from "../Atendimento/Atendimento/Formatendimento";
import { Route, Routes } from "react-router-dom";
import FormAtendimento from "../Atendimento/Atendimento/Formatendimento";
import AtendimentoPage from "../../../pages/Atendimento";
import Home from "../../../pages/Home";
import Footer from "../Footer/Footer";
import { useState } from "react";
interface ConditionProps {
  atendimento:  any;// Defina o tipo correto para atendimento
  atendimentos: String[] ;// Defina o tipo correto para atendimentos
}
interface CondiçãoAtendimentoData {
  
  patient_id: number;
  
  atendimento: string;

  id: string;
paciente: Patient;
sintomasSelecionados: Symptom[];
}
interface Symptom {
  id: number;
  name: string;
  created_at: null | Date;
  updated_at: null | Date;
}

interface Patient {
  name: string;
  identifier: string;
  phone_number: string;
  birthdate: string;
  image: File | null | undefined;
  id: number;

  // Defina a estrutura dos dados do paciente conforme necessário
}
const Mainlayout: React.FC = () => {
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


//aqui vou passa a condiçao para todas as paginas aaa
export default Mainlayout;
