import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
interface CondiçaoAtendimentoProps {
    id?: string;
  }
  
  interface CondiçãoAtendimentoData {
    patient_id: string;
    // Outras propriedades do atendimento
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

  const CondiçaoAtendimento: React.FC<CondiçaoAtendimentoProps> = ( { id }) => {
    const [condicao, setCondicao] = useState<CondiçãoAtendimentoData | null>(null);
const { patientId } = useParams<{ patientId?: string }>(); // Ob
// useEffect(() => {
//     const fetchData = async () => {
//         try {
//           const response = await axios.get<CondiçãoAtendimentoData>(`http://covid-checker.sintegrada.com.br/api/patients/${id}/attendance`);
//           setCondicao(response.data);
//           console.log(response.data)
//         } catch (error) {
//           console.error('Erro ao obter os dados:', error);
//         }
//       };
  
//       fetchData();


// }, [])

  return (
    <div>
       {/* {condicao && (
        <div>
          <h1>ID do Paciente: {condicao.patient_id}</h1>
        </div>
      )} */}
    </div>
  )
}
//aqui fica so o map etc
export default CondiçaoAtendimento

