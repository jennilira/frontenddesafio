import React, { useState, ChangeEvent, useEffect, FormEvent } from "react";
import { BsChevronRight, BsChevronDown } from "react-icons/bs";
import Switch from "react-switchery";

import { Form, Row, Col, Button } from "react-bootstrap";
import axios from "axios";
import "./InfoAtendimento";
// import symptoms from "./symtoms/Symptoms";
import Symptoms from "./symtoms/symptoms";
import { useParams } from "react-router";

interface Symptom {
  id: number;
  name: string;
  created_at: null | Date;
  updated_at: null | Date;
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

interface FormExampleProps {}

const FormAtendimento: React.FC<FormExampleProps> = () => {
  const { id } = useParams();
  const [sintomasSelecionados, setSintomasSelecionados] = useState<number[]>(
    []
  );
  const [symptoms, setSymptoms] = useState<Symptom[]>([
    {
      id: 1,
      name: "Febre",
      created_at: null,
      updated_at: null,
    },
    {
      id: 2,
      name: "Coriza",
      created_at: null,
      updated_at: null,
    },
    {
      id: 3,
      name: "Nariz entupido",
      created_at: null,
      updated_at: null,
    },
    {
      id: 4,
      name: "Cansaço",
      created_at: null,
      updated_at: null,
    },
    {
      id: 5,
      name: "Tosse",
      created_at: null,
      updated_at: null,
    },
    {
      id: 6,
      name: "Dor de cabeça",
      created_at: null,
      updated_at: null,
    },
    {
      id: 7,
      name: "Dores no corpo",
      created_at: null,
      updated_at: null,
    },
    {
      id: 8,
      name: "Mal estar geral",
      created_at: null,
      updated_at: null,
    },
    {
      id: 9,
      name: "Dor de garganta",
      created_at: null,
      updated_at: null,
    },
    {
      id: 10,
      name: "Dificuldade de respirar",
      created_at: null,
      updated_at: null,
    },
    {
      id: 11,
      name: "Falta de paladar",
      created_at: null,
      updated_at: null,
    },
    {
      id: 12,
      name: "Falta de olfato",
      created_at: null,
      updated_at: null,
    },
    {
      id: 13,
      name: "Dificuldade de locomoção",
      created_at: null,
      updated_at: null,
    },
    {
      id: 14,
      name: "Diarreia",
      created_at: null,
      updated_at: null,
    },
  ]);

  //logica aa
  console.log(symptoms.length);

  const [clickedbtn, setClickedbtn] = useState(false);
  const [clickedbtn2, setClickedbtn2] = useState(true);

  const handleClick = () => {
    setClickedbtn(!clickedbtn);
  };
  const handleClick2 = () => {
    setClickedbtn2(!clickedbtn2);
  };

  useEffect(() => {
    console.log(sintomasSelecionados)
  }, [sintomasSelecionados])

  const [formData, setFormData] = useState({
    patient_id: id,
    temperature: "",
    systolic_pressure: "",
    diastolic_pressure: "",
    respiratory_rate: "",
    pulse: "",
    symptoms: sintomasSelecionados,
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Obtém os valores dos sintomas do componente Symptoms

    try {
      const response = await axios.post(
        "http://covid-checker.sintegrada.com.br/api/attendance",
        formData
      );

      console.log("Dados inseridos com sucesso:", response.data);

      // Limpa o formulário após a inserção
      setFormData({
        patient_id: id,
        temperature: "",
        systolic_pressure: "",
        diastolic_pressure: "",
        respiratory_rate: "",
        pulse: "",
        symptoms: sintomasSelecionados,
      });
    } catch (error) {
      console.error("Erro ao inserir dados:", error);
      console.log(formData);
     
    }
  };
 //aqui
   

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <div className=" container-atendimento mt-3 p-3  ">
        <div className="col-6">
          <div className="display-flex">
            <div className="row">
              <div className="col-6">
                <div className="div-item">
                  {" "}
                  <div className="texto1">Saude do Paciente </div>{" "}
                </div>
              </div>

              <div className="col-6  ">
                {" "}
                <button className="div-item ml-auto butao d-flex justify-content-end">
                  {" "}
                  <div onClick={handleClick}></div>
                </button>
              </div>
            </div>

            <div className=" "> </div>

            <div>
              <Row>
                <Col className="mb-2">
                  <Form.Group controlId="formTemperature">
                    <Form.Label>Temperature</Form.Label>
                    <Form.Control
                      type="number"
                      name="temperature"
                      placeholder="coloque aqui a temperatura"
                      value={formData.temperature}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                {/* <Form.Label className="texto2 mt-2 ">
                  Pressão arterial
                </Form.Label> */}
                <Col>
                  <Form.Group controlId="formSystolicPressure" className="mb-4">
                    <Form.Label>Systolic Pressure</Form.Label>
                    <Form.Control
                      type="number"
                      name="systolic_pressure"
                      placeholder="coloque aqui sua pressão sistolica"
                      value={formData.systolic_pressure}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
                <Col className="mb-2">
                  <Form.Group controlId="formDiastolicPressure">
                    <Form.Label>Diastolic Pressure</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="coloque aqui a sua pressao diastolica"
                      name="diastolic_pressure"
                      value={formData.diastolic_pressure}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col className="mb-2">
                  <Form.Group controlId="formRespiratoryRate">
                    <Form.Label>Respiratory Rate</Form.Label>
                    <Form.Control
                      type="number"
                      name="respiratory_rate"
                      placeholder="coloque aqui a sua respiração"
                      value={formData.respiratory_rate}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
                <Col className="mb-2">
                  <Form.Group controlId="formPulse">
                    <Form.Label>Pulse</Form.Label>
                    <Form.Control
                      type="number"
                      name="pulse"
                      placeholder="coloque aqui  sua pulsação"
                      value={formData.pulse}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
              </Row>
            </div>
          </div>
        </div>
        <div className="col-6">
          <div className="form-2">
            <div className="row  ">
              <div className="col-6"></div>{" "}
            </div>

            <Form className="px-2 ">
              <div className="div-item mb-3 ">
                {" "}
                <div className=" texto1">Sintomas</div>{" "}
              </div>
              <div className="">
                <Symptoms
                  symptoms={symptoms}
                  sintomasSelecionados={sintomasSelecionados}
                  setSintomasSelecionados={setSintomasSelecionados}
                />
              </div>
            </Form>
          </div>
        </div>
      </div>
      <div className="div-item ml-auto butao d-flex justify-content-end  ">
        <button className="btn-blue" type="submit">
          Finalizar
        </button>
      </div>
    </Form>
  );
};

export default FormAtendimento;
