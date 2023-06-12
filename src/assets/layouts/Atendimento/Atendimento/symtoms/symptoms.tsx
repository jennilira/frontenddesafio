import React, { useState, useEffect, Dispatch } from "react";
import Switch from "react-switchery";
import "./Symptoms.css";
import Form from "react-bootstrap/Form";
import ListPatients from "../../../../../components/TablesList/listPatients/ListPatients";

interface Symptom {
  id: number;
  name: string;
  created_at: null | Date;
  updated_at: null | Date;
}
interface FormErrors {
  [key: string]: string[];
}

interface SymptomProps {
  symptoms: Symptom[];
  sintomasSelecionados: number[];
  setSintomasSelecionados: Dispatch<number[]>;
}

const Symptoms: React.FC<SymptomProps> = ({
  symptoms,
  sintomasSelecionados,
  setSintomasSelecionados,
}) => {
  const handleSelecionarSintoma = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value, checked } = event.target;
    // const sintomaId = index + 1;
    const sintomaId =
      symptoms.findIndex((symptom) => symptom.id === Number(value)) + 1;

    if (checked) {
      setSintomasSelecionados([...sintomasSelecionados, sintomaId]);
    } else {
      let filter = sintomasSelecionados.filter((sintoma) => {
        return sintoma !== sintomaId;
      });
      setSintomasSelecionados(filter);
    }
  };

  const [errors, setErrors] = useState<FormErrors>({});

  return (
    <div>
      {symptoms.map((symptom, i) => (
        <div
          key={symptom.id}
         
        >
        
          <Form.Check
            type="checkbox"
            id="custom-switch"
            className="checkbox"
            label={symptom.name}
          
            value={symptom.id}
            onChange={handleSelecionarSintoma}
          />
          {errors.symptoms && errors.symptoms.length > 0 && (
            <div className="error-message">
              <p>{errors.symptoms[0] && "o campo simtomas é obrigatorio "}</p>
            </div>
          )}
      
        </div>
      ))}
    </div>
  );
};

export default Symptoms;
