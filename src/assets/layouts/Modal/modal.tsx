import React, { useState, ChangeEvent, FormEvent } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import "./modal";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import "./Modas.css";
import InputMask from "react-input-mask";

axios.defaults.headers.common["Accept"] = "application/json";

interface FormValues {
  name: string;
  identifier: string;
  phone_number: string;
  birthdate: string;
  image: File | null | undefined;
}

interface FormErrors {
  [key: string]: string[];
}

const Example: React.FC = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [response, setResponse] = useState<any | null>(null);
  const [errors, setErrors] = useState<FormErrors>({});
  const formik = useFormik<FormValues>({
    initialValues: {
      name: "",
      identifier: "",
      phone_number: "",
      birthdate: "",
      image: null,
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required("nome é obrigatório"),
      identifier: Yup.string()
        .required("CPF é obrigatório")
        .test("cpf", "Invalid CPF", (value) => {
          // Perform CPF validation here
          return cpfValidator(value);
        })
        .test("unique", "Identifier must be unique", async (value) => {
          // Perform uniqueness check here
          return isIdentifierUnique(value);
        }),
      phone_number: Yup.string().required("Telefone é obrigatório"),
      birthdate: Yup.string().required("Data de nascimento é obrigatório"),
      image: Yup.mixed().required("Foto é obrigatório"),
    }),
    onSubmit: async (values: FormValues) => {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("identifier", values.identifier);
      formData.append("birthdate", values.birthdate);
      formData.append("phone_number", values.phone_number);
      if (values.image) {
        formData.append("image", values.image);
      }

      try {
        const response = await axios.post(
          "http://covid-checker.sintegrada.com.br/api/patients",
          formData
        );

        toast.success('Paciente cadastrado com sucesso!');
        setResponse(response.data.data);
        handleClose();
        formik.resetForm(); // Limpar os valores dos inputs após o envio bem-sucedido

      } catch (error) {
        if (axios.isAxiosError(error)) {
          const axiosError = error;
          toast.error('Ocorreu um erro!');

          if (axiosError.response && axiosError.response.status === 422) {
            setErrors(axiosError.response.data.errors);
          } else if (axiosError.response?.status === 413) {
            setErrors(axiosError.response.data.errors);
          } else {
            console.log(axiosError);
            toast.error('Ocorreu um erro!');
          }
        }
      }
    },
  });

  const cpfValidator = (value: string) => {
    // Implement CPF validation logic here
    // Return true if valid, false otherwise
    return true;
  };

  const isIdentifierUnique = async (value: string) => {
    // Perform uniqueness check here
    // Return true if unique, false otherwise
    return true;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      formik.setFieldValue("image", e.target.files[0]);
    } else {
      formik.setFieldValue(e.target.name, e.target.value);
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} className="centered">
        <Modal.Header closeButton>
          <Modal.Title>Cadastrar paciente</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={formik.handleSubmit}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Foto do paciente</Form.Label>
              <Form.Control
                type="file"
                name="image"
                onChange={handleChange}
                autoFocus
              />
              {formik.errors.image && formik.touched.image && (
                <div className="error-message">{formik.errors.image}</div>
              )}

              {errors.image && errors.image.length > 0 && (
                <div className="error-message">
                  <p>{errors.image[0] && "imagem grande  ou formato inválido"}</p>
                </div>
              )}
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Nome Completo</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={formik.values.name}
                  onChange={handleChange}
                  placeholder="Nome completo do paciente"
                  autoFocus
                />

                {formik.errors.name && formik.touched.name && (
                  <div className="error-message">{formik.errors.name}</div>
                )}
              </Form.Group>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>CPF</Form.Label>
              <InputMask
                mask="999.999.999-99"
                maskChar=""
                value={formik.values.identifier}
                onChange={handleChange}
                className="form-control"
                id="identifier"
                name="identifier"
                placeholder="000.000.000-00"
              />
               {formik.errors.identifier && formik.touched.identifier && (
                    <div className="error-message">{formik.errors.identifier}</div>
                  )}
              {errors.identifier && errors.identifier.length > 0 && (
                <div className="error-message">
                  <p>{errors.identifier[0] && "cpf invalido ou  já cadastrado "}</p>
                </div>
              )}
            </Form.Group>
            <div className="row row-space">
              <div className="col-6 mb-3">
                <Form.Label>Data de Nascimento</Form.Label>
                <div>
                  <Form.Control
                    type="date"
                    name="birthdate"
                    value={formik.values.birthdate}
                    onChange={handleChange}
                    placeholder="Digite a data de nascimento"
                    autoFocus
                  />
                  {formik.errors.birthdate && formik.touched.birthdate && (
                    <div className="error-message">{formik.errors.birthdate}</div>
                  )}
                </div>
              </div>
              <div className="col-6 mb-3">
                <Form.Label>Telefone</Form.Label>
                <div>
                  <InputMask
                    mask="(99) 99999-9999"
                    maskChar=""
                    value={formik.values.phone_number}
                    onChange={handleChange}
                    className="form-control"
                    id="phone_number"
                    name="phone_number"
                    placeholder="(00) 90000-0000"
                  />
                  {formik.errors.phone_number && formik.touched.phone_number && (
                    <div className="error-message">{formik.errors.phone_number}</div>
                  )}
                   {errors.phone_number && errors.phone_number.length > 0 && (
                <div className="error-message">
                  <p>{errors.phone_number[0] }</p>
                </div>
              )}
                </div>
              </div>
            </div>
            <Modal.Footer>
              <Button className="btn-blue" type="submit">
                Salvar
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
      <ToastContainer />

      <div
        className="d-flex justify-content-end btn-blue  modal-btn"
        onClick={handleShow}
      >
        Novo paciente
      </div>

      
    </>
  );
};

export default Example;
