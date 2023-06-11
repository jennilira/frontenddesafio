import React from "react";
import ListPatients from "../components/TablesList/listPatients/ListPatients";
import Modalpaciente from "../assets/layouts/Modal/modal";
import PaginationExample from "../components/TablesList/listPatients/Pagination";
import { useParams } from "react-router";
import axios from "axios";
import { useEffect, useState } from "react";

interface CondiçaoAtendimentoProps {
  id?: string;
  atendimento: any; // Defina o tipo correto para atendimento
  atendimentos: string; // Defina o tipo correto para atendimentos
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

interface CondiçãoAtendimentoData {
  patient_id: number;

  atendimento: string;
  condicao: any;
  id: string;
  paciente: Patient;
  sintomasSelecionados: Symptom[];
}
interface Atendimento {
  patient_id: string;
  temperature: string;
  systolic_pressure: string;
  diastolic_pressure: string;
  respiratory_rate: string;
  pulse: string;
  symptoms: Symptom[];
}
interface Symptom {
  id: number;
  name: string;
  created_at: null | Date;
  updated_at: null | Date;
}

const Home: React.FC = () => {
  return (
    <div>
      <Modalpaciente />
      {/* <ListPatients/> */}
      <PaginationExample />
    </div>
  );
};

export default Home;
