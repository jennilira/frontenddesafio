import React, { useState, useEffect } from "react";
import DataList from "../assets/layouts/Atendimento/ListaAtendimento/InfoAtendimento";
import FormAtendimento from "../assets/layouts/Atendimento/Atendimento/Formatendimento";
import { useParams } from "react-router-dom";
import axios from "axios";

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

interface Paciente {
  name: string;
  identifier: string;
  phone_number: string;
  birthdate: string;
  image: File | null | undefined;
  id: number;
  //
}

interface CondicaoAtendimentoData {
  patient_id: number;
  atendimento: string;
  id: string;
  paciente: Paciente;
  sintomasSelecionados: Symptom[];
}

function AtendimentoPage() {
  // const CondiçaoAtendimento: React.FC<CondiçaoAtendimentoProps> = ( { id  }) => {
  const [atendimento, setAtendimento] = useState<CondicaoAtendimentoData[]>([]);
  // const [atendimento, setAtendimento] = useState<CondiçãoAtendimentoData | null>(null);
  const { patientId } = useParams<{ patientId?: string }>(); // Ob
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://covid-checker.sintegrada.com.br/api/patients/${id}/attendances`
        );
        setAtendimento(response.data.data);
        console.log(response.data.data);
      } catch (error) {
        console.error("Erro ao obter os dados atendimento :", error);
      }
    };

    fetchData();
  }, []);


  const [paciente, setPaciente] = useState<Paciente | null>(null);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchPaciente = async () => {
      try {
        const response = await axios.get(
          `http://covid-checker.sintegrada.com.br/api/patients/${id}`
        );
        setPaciente(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPaciente();
  }, [id]);

  return (
    <div>
      <DataList paciente={paciente} atendimento={atendimento} />
      <FormAtendimento />

      {/* condicao={condicao}  */}
    </div>
  );
}

export default AtendimentoPage;

