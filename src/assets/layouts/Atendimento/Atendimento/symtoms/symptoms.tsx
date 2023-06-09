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

  return (
    <div>
      {symptoms.map((symptom, i) => (
        <div
          key={symptom.id}
          // className="sintoma-item"
          // className={`switchery-checkbox ${checked ? "checked" : ""}`}
        >
          {/* <input
           type="checkbox"
           id="custom-switch"
          className=""
           
            // type="checkbox"
            value={symptom.id}
            onChange={handleSelecionarSintoma}
            onClick={mostrarSintomasSelecionados}
          /> */}
          <Form.Check
            type="checkbox"
            id="custom-switch"
            className=""
            label={symptom.name}
            // type="checkbox"
            value={symptom.id}
            onChange={handleSelecionarSintoma}
          />
          {/* <label htmlFor="my-checkbox"></label> */}
        </div>
      ))}
    </div>
  );
};

export default Symptoms;
