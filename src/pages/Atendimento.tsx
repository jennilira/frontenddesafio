import React, { useState, useEffect } from "react";
import DataList from "../assets/layouts/Atendimento/Atendimento/InfoAtendimento";
import FormAtendimento from "../assets/layouts/Atendimento/Atendimento/Formatendimento";
import { useParams } from "react-router-dom";
import axios from "axios";

interface Paciente {
  name: string;
  identifier: string;
  phone_number: string;
  birthdate: string;
  image: File | null | undefined;
  id: number;
  //
}

function AtendimentoPage() {
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
      <DataList paciente={paciente} />
      <FormAtendimento />
    </div>
  );
}

export default AtendimentoPage;
