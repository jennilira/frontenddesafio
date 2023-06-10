import React, { useState, ChangeEvent, useEffect, FormEvent } from "react";
import { BsChevronRight, BsChevronDown } from "react-icons/bs";
import Switch from "react-switchery";
import { toast, ToastContainer } from "react-toastify";
// import { ChangeEvent } from 'react';
import "react-toastify/dist/ReactToastify.css";
import "./FormAtendimento.css";
import { Form, Row, Col, Button } from "react-bootstrap";
import axios from "axios";

import "../ListaAtendimento/InfoAtendimento";
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

interface FormErrors {
  [key: string]: string[];
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
  // console.log(symptoms.length);

  const [clickedbtn, setClickedbtn] = useState(false);
  const [clickedbtn2, setClickedbtn2] = useState(true);

  // erros
  const [errors, setErrors] = useState<FormErrors>({});

  const handleClick = () => {
    setClickedbtn(!clickedbtn);
  };
  const handleClick2 = () => {
    setClickedbtn2(!clickedbtn2);
  };

  useEffect(() => {
    console.log(sintomasSelecionados);
    console.log(errors);

    console.log(formData);
    console.log(symptoms);
  }, [sintomasSelecionados]);

  // useEffect(() =>{

  // }, [])

  const [formData, setFormData] = useState({
    patient_id: id,
    temperature: "",
    systolic_pressure: "",
    diastolic_pressure: "",
    respiratory_rate: "",
    pulse: "",
    symptoms: sintomasSelecionados,
    // symptoms: sintomasSelecionados,
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
      toast.success("Paciente Atendido com sucesso!");
    } catch (error) {
      console.error("Erro ao inserir dados:", error);
      console.log(formData);

      toast.error("Ocorreu um erro!");
      if (axios.isAxiosError(error)) {
        const axiosError = error;

        if (axiosError.response && axiosError.response.status) {
          setErrors(axiosError.response.data.errors);
          setErrors(axiosError.response.data.errors);
          console.log(axiosError.response.data.errors);
          //aqui em cima
        } else if (axiosError.response?.status === 413) {
          setErrors(axiosError.response.data.errors);
        } else {
          console.log(axiosError);
        }
      }
    }
  };
  //aqui

  const [respostaVisual, setRespostaVisual] = useState(""); //resposta da pressao
  const [RespostaTemperatura, setdefinirRespostaTemperatura] = useState("");
  const [RespostaPulso, setRespostaPulso] = useState("");
  const [Respostarespiracao, setRespostarespiracao] = useState("");

  useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      symptoms: sintomasSelecionados,
    }));
  }, [sintomasSelecionados]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    const { diastolic_pressure, systolic_pressure, temperature, pulse } =
      formData;

    //  if (name === 'diastolic_pressure') {

    //   definirRespostaVisual(parseFloat(value), parseFloat(formData.systolic_pressure));
    // } else if (name === 'systolic_pressure') {
    //   definirRespostaVisual(parseFloat(formData.diastolic_pressure), parseFloat(value));
    // }
    if (name === "temperature") {
      // definirRespostaVisual(parseFloat(value), parseFloat(formData.diastolic_pressure));
      definirRespostaTemperatura(parseFloat(value));
    } else if (name === "systolic_pressure") {
      definirRespostaVisual(
        parseFloat(value),
        parseFloat(formData.systolic_pressure)
      );
    } else if (name === "diastolic_pressure") {
      definirRespostaVisual(
        parseFloat(formData.diastolic_pressure),
        parseFloat(value)
      );
    } else if (name === "pulse") {
      definirRespostaPulso(parseFloat(value));
    } else if (name === "respiratory_rate") {
      definirRespostaFrequenciaRespiratoria(parseFloat(value));
    }
  };

  const definirRespostaVisual = (
    diastolic_pressure: number,
    systolic_pressure: number
  ) => {
    let resposta: string = "";
    let respostaEspecifica: string = "";
    if (diastolic_pressure < 90 && systolic_pressure < 60) {
      resposta = "hipertenso";
    } else if (
      systolic_pressure >= 90 &&
      systolic_pressure <= 130 &&
      diastolic_pressure >= 60 &&
      diastolic_pressure <= 85
    ) {
      resposta = "normotenso";
    } else if (
      systolic_pressure >= 130 &&
      systolic_pressure <= 139 &&
      diastolic_pressure >= 85 &&
      diastolic_pressure <= 89
    ) {
      resposta = "normotenso-limitrofe";
    } else if (
      systolic_pressure >= 140 &&
      systolic_pressure <= 150 &&
      diastolic_pressure >= 90 &&
      diastolic_pressure <= 99
    ) {
      resposta = "hipertenso-leve";
    } else if (
      systolic_pressure >= 160 &&
      systolic_pressure <= 179 &&
      diastolic_pressure >= 100 &&
      diastolic_pressure <= 109
    ) {
      resposta = "hipertenso-moderado";
    } else if (systolic_pressure >= 180 && diastolic_pressure >= 110) {
      resposta = "hipertenso-grave";
    } else {
      resposta = "nao é condizente"; //
    }
    console.log("Valor de diastolic_pressure:", diastolic_pressure);
    console.log("Valor de systolic_pressure:", systolic_pressure);
    setRespostaVisual(resposta);

    console.log(resposta);
    console.log(resposta);
    console.log(respostaEspecifica);
  };

  const definirRespostaTemperatura = (temperature: number) => {
    let respostaTemperatura: string = "";

    if (temperature < 35) {
      respostaTemperatura = "hipotermia";
    } else if (temperature >= 36.1 && temperature <= 37.2) {
      respostaTemperatura = "afebril/normotermia";
    } else if (temperature >= 37.3 && temperature <= 37.7) {
      respostaTemperatura = "estado febril ou febrícula";
    } else if (temperature >= 37.8 && temperature <= 38.9) {
      respostaTemperatura = "febre";
    } else if (temperature >= 39 && temperature <= 40) {
      respostaTemperatura = "hiperpirexia";
    } else {
      respostaTemperatura = "nao é condizente";
    }

    setdefinirRespostaTemperatura(respostaTemperatura);
    // setRespostaVisual(respostaTemperatura);
  };

  const definirRespostaPulso = (pulse: number) => {
    let respostaPulso: string = "";

    if (pulse < 60) {
      respostaPulso = "bradicárdio";
    } else if (pulse >= 60 && pulse <= 100) {
      respostaPulso = "normocárdico";
    } else if (pulse > 100) {
      respostaPulso = "taquicárdico";
    }

    setRespostaPulso(respostaPulso);
  };

  const definirRespostaFrequenciaRespiratoria = (respiratory_rate: number) => {
    let respostaFrequenciaRespiratoria: string = "";

    if (respiratory_rate < 14) {
      respostaFrequenciaRespiratoria = "bradipnéico";
    } else if (respiratory_rate >= 14 && respiratory_rate <= 20) {
      respostaFrequenciaRespiratoria = "eupnéico";
    } else if (respiratory_rate > 20) {
      respostaFrequenciaRespiratoria = "taquipnéico";
    }
    else  {
      respostaFrequenciaRespiratoria = "nao é condizente";
    }

    setRespostarespiracao(respostaFrequenciaRespiratoria);
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
                    <div className={`temperature  ${RespostaTemperatura}`}>
                      {RespostaTemperatura &&
                        `Classificação: ${RespostaTemperatura}`}
                    </div>

                    {errors.temperature && errors.temperature.length > 0 && (
                      <div className="error-message">
                        <p>{errors.temperature[0]}</p>
                      </div>
                    )}
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

                    <div className={`resposta-visual ${respostaVisual}`}>
                      {respostaVisual && `Classificação: ${respostaVisual}`}
                    </div>

                    {errors.systolic_pressure &&
                      errors.systolic_pressure.length > 0 && (
                        <div className="error-message">
                          <p>{errors.systolic_pressure[0]}</p>
                        </div>
                      )}
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
                    <div className={`resposta-visual ${respostaVisual}`}>
                      {respostaVisual && `Classificação: ${respostaVisual}`}
                    </div>
                    {errors.diastolic_pressure &&
                      errors.diastolic_pressure.length > 0 && (
                        <div className="error-message">
                          <p>
                            {errors.diastolic_pressure[0] && "algum problema "}
                          </p>
                        </div>
                      )}
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
                    <div className={`temperature  ${Respostarespiracao}`}>
                      {Respostarespiracao &&
                        `Classificação: ${Respostarespiracao}`}
                    </div>
                    {errors.respiratory_rate &&
                      errors.respiratory_rate.length > 0 && (
                        <div className="error-message">
                          <p>{errors.respiratory_rate[0]}</p>
                        </div>
                      )}
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
                    <div className={`temperature  ${RespostaPulso}`}>
                      {RespostaPulso && `Classificação: ${RespostaPulso}`}
                    </div>
                    {errors.pulse && errors.pulse.length > 0 && (
                      <div className="error-message">
                        <p>{errors.pulse[0]}</p>
                      </div>
                    )}
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
                {errors.symptoms && errors.symptoms.length > 0 && (
                  <div className="error-message">
                    <p>
                      {errors.symptoms[0] && "o campo simtomas é obrigatorio "}
                    </p>
                  </div>
                )}
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
      <ToastContainer />
    </Form>
  );
};

export default FormAtendimento;
