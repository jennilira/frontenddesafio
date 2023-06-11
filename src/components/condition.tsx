import React, { useEffect, useState } from "react";
import { MdOutlineReportProblem } from "react-icons/md";
import './condition.css'
import { BsFillExclamationTriangleFill } from "react-icons/bs";
import { AiOutlineExclamationCircle } from "react-icons/ai";

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

interface ConditionProps {
  atendimento: any; // Defina o tipo correto para atendimento
}

const Condition: React.FC<ConditionProps> = ({ atendimento }) => {
  const [SI, setSI] = useState(false);
  const [PotI, setPotI] = useState(false);
  const [PosI, setPosI] = useState(false);

  useEffect(() => {
    const totalSintomas = 14;
    const sintomasMarcados = atendimento?.symptoms?.length;
    const porcentagemSintomas = (sintomasMarcados / totalSintomas) * 100;

    if (porcentagemSintomas >= 0 && porcentagemSintomas <= 39) {
      setSI(true);
    } else if (porcentagemSintomas >= 40 && porcentagemSintomas <= 59) {
      setPotI(true);
    } else if (porcentagemSintomas >= 60 && porcentagemSintomas <= 100) {
      setPosI(true);
    } else {
      setSI(false);
      setPotI(false);
      setPosI(false);
    }
  }, [atendimento]);

  return (
    <div>
      {SI ? (
        <div className="insuficientes cont">  Sintomas insuficientes</div>
      ) : PotI ? (
        <div className="Pote-inf cont"><AiOutlineExclamationCircle size={20}/>  Potencial Infectado</div>
      ) : PosI ? (
        <div className="poss-inf cont"> <BsFillExclamationTriangleFill size={15} className=""/>  Possível Infectado</div>
      ) : (
        <div className="nao-atendido cont">Não atendido</div>
      )}
    </div>
  );
};

export default Condition;
