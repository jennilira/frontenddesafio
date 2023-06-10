import React, { useState, useEffect } from "react";
import DataList from "../assets/layouts/Atendimento/ListaAtendimento/InfoAtendimento";
import FormAtendimento from "../assets/layouts/Atendimento/Atendimento/Formatendimento";
import { useParams } from "react-router-dom";
import axios from "axios";
import CondiçaoAtendimento from "../assets/layouts/Atendimento/Condicao/Condicao";

interface Paciente {
  name: string;
  identifier: string;
  phone_number: string;
  birthdate: string;
  image: File | null | undefined;
  id: number;
  //
}
interface CondiçaoAtendimentoProps {
  id?: string;
  
}



interface CondiçãoAtendimentoData {
  
    patient_id: number;
    // Outras propriedades do atendimento
  
  // Outras propriedades do atendimento
}

// interface Atendimento {
//   patient_id: string;
//   temperature: string;
//   systolic_pressure: string;
//   diastolic_pressure: string;
//   respiratory_rate: string;
//   pulse: string;
//   symptoms: Symptom[];
// }




function AtendimentoPage( { } ) {


  // const CondiçaoAtendimento: React.FC<CondiçaoAtendimentoProps> = ( { id  }) => {
    const [condicao, setCondicao] = useState<CondiçãoAtendimentoData | null>(null);
  const { patientId } = useParams<{ patientId?: string }>(); // Ob
  useEffect(() => {
    const fetchData = async () => {
        try {
          const response = await axios.get(`http://covid-checker.sintegrada.com.br/api/patients/${id}/attendances`);
          setCondicao(response.data.data);
          console.log(response.data.data)
        
        } catch (error) {
          console.error('Erro ao obter os dados atendimento :', error);
        }
      };
  
      fetchData();
  
  
  }, [])
  


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
      <CondiçaoAtendimento />
      {/* condicao={condicao}  */}
    </div>
  );
}

export default AtendimentoPage;
