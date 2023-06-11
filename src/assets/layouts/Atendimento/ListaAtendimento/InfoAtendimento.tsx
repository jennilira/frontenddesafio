import Condition from "../../../../components/condition";
import "../Atendimento/Atedimento.css";
import "./InfoAtendimento.css";
import React, { FC, useEffect, useState } from "react";

interface Paciente {
  name: string;
  identifier: string;
  phone_number: string;
  birthdate: string;
  image: File | null | undefined;
  id: number;
  //
}

interface PacienteProps {
  paciente: null | Paciente;
  atendimento: any;
}

interface CondiçaoAtendimentoProps {
  id?: string;
}

interface CondiçãoAtendimentoData {
  patient_id: number;
}

const DataList: FC<PacienteProps> = ({
  paciente,
  atendimento,
}): JSX.Element => {
  return (
    <div>
      {paciente && (
        <div className="  container-atendimento mt-3">
          <div className="row">
            <div className="header-table">
              <p className="texto1">Informaçoes do Paciente</p>
            </div>
            <div className="col-3">
              <div className="img-atendimento">
                <img
                  className="img"
                  alt=""
                  src={`http://covid-checker.sintegrada.com.br/storage/${paciente?.image}`}
                />
              </div>
            </div>
            <div className="   col-9">
              <div className="row">
                <div className="col">
                  <div className="div-item info-text row">
                    Nome :
                    <div className="info-text col "> {paciente.name} </div>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col">
                  <div className="div-item info-text row">
                    Cpf:
                    <div className="info-text col "> {paciente.identifier}</div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <div className="div-item info-text row">
                    Data de nascimento:
                    <div className="info-text col ">{paciente.birthdate}</div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <div className="div-item info-text row">
                   Telefone
                    <div className="info-text col ">{paciente.phone_number}</div>
                  </div>
                </div>
              </div>
            </div>

            
          </div>
          <div className="col-6">
              {" "}
              <div className="row">
                <div className="col">
                  <div className="div-item info-text row mt-3">Condição do último atendimento </div>
                  <Condition atendimento={atendimento[atendimento?.length - 1]} />
                </div>
              </div>
            </div>
        </div>
      )}
    </div>
  );
};

export default DataList;
//devo exibir somente os resultados de cada atendimento...e pronto ,aqui deve ser exibido isso
//ver se foi atendido é facil..so um filter
