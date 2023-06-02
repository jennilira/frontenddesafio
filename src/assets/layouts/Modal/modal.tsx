import React, { useState, ChangeEvent, FormEvent } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import "./modal";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios, { AxiosError, AxiosResponse } from "axios";
import "./Modas.css";
import { type } from "os";
import InputMask from "react-input-mask";
// import 'react-input-mask/dist/react-input-mask.css';
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
  // const [texterro, setTexterro] = useState("");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [response, setResponse] = useState<AxiosResponse | null>(null);
  // const [error, setError] = useState<string | null>(null);

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
      name: Yup.string().required("Name is required"),
      identifier: Yup.string()
        .required("Identifier is required")
        .test("cpf", "Invalid CPF", (value) => {
          // Perform CPF validation here
          return cpfValidator(value);
        })
        .test("unique", "Identifier must be unique", async (value) => {
          // Perform uniqueness check here
          return isIdentifierUnique(value);
        }),
      phone_number: Yup.string().required("Phone number is required"),
      birthdate: Yup.string().required("Birthdate is required"),
      image: Yup.mixed().required("Image is required"),
      // .test('fileType', 'Invalid file type', (value) => {
      //   // Perform file type validation here aaa terminar....
      //   // return isValidImageType(value);
      // }),
    }),
    onSubmit: async (values: FormValues) => {
      // Handle form submission here
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
          "http://localhost:8989/api/patients",
          formData
        );
        console.log(response.data.message);
        setResponse(response);
        // setError(response.data.erros)
        //esse
        // handleClose();

        // Fecha o modal após o envio bem-sucedido
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const axiosError = error;

          if (axiosError.response && axiosError.response.status === 422  ) {
            // Acessa o objeto de erros da resposta e define o estado de erros
            setErrors(axiosError.response.data.errors);
            console.log(axiosError.response.data.errors);
          } else if (axiosError.response?.status === 413) {
            setErrors(axiosError.response.data.errors);
            console.log(axiosError.response.data.errors);
           
          }else{
            console.log(axiosError);
          }
        }
      }
    },
  });

  // Custom validation functions
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

  const isValidImageType = (value: File | null) => {
    if (value instanceof File) {
      // Implement file type validation logic here
      // Return true if valid, false otherwise
      return true;
    }
    return false;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      formik.setFieldValue("image", e.target.files[0]);
    } // Restante do código...
    else {
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
                  <p>
                    {errors.image[0] && "imagem grande  ou formato inválido"}
                  </p>
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
              {/* <Form.Control
                type="text"
                name="identifier"
                value={formik.values.identifier}
            
                onChange={handleChange}
                placeholder=""
                autoFocus
             
                maxLength={11}
              /> */}

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
              {errors.identifier && errors.identifier.length > 0 && (
                <div className="error-message">
                  <p>
                    {errors.identifier[0] && "cpf invalido ou  já cadastrado "}
                  </p>
                </div>
              )}
              {/* {errors.identifier && (<div className="error-message"> {errors.identifier[0]} </div>)} */}
              {/* {formik.errors.identifier && formik.touched.identifier && (
                <div className="error-message">{formik.errors.identifier}</div>
              )} */}
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
                    <div className="error-message">
                      {formik.errors.birthdate}
                    </div>
                  )}
                </div>
              </div>
              <div className="col-6 mb-3">
                <Form.Label>Telefone</Form.Label>
                <div>
                  {/* <Form.Control
                    type="text"
                    name="phone_number"
                    value={formik.values.phone_number}
                    onChange={handleChange}
                    placeholder="(00) 90000-0000"
                    autoFocus
                  /> */}

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
                  {formik.errors.phone_number &&
                    formik.touched.phone_number && (
                      <div className="error-message">
                        {formik.errors.phone_number}
                      </div>
                    )}
                </div>
              </div>
            </div>
            <Modal.Footer>
              {/* <Button className="btn-white" variant="secondary" onClick={handleClose}>
                Fechar
              </Button> */}
              <Button className="btn-blue"   type="submit">
                Salvar
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>

      <div
        className="d-flex justify-content-end btn-blue  modal-btn"
        onClick={handleShow}
      >
       Novo paciente
      </div>
    </>
  );
};
//testes erros imagens grandes de mais 413 error (to large)
export default Example;
