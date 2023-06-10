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
}

const DataList: FC<PacienteProps> = ({ paciente }): JSX.Element => {
  return (
    <div>
      {paciente && (
        <div className=" custom-container container-atendimento mt-3">
          <div className="row">
            <div className="header-table">
              <p className="texto1">Informaçoes do Paciente</p>
            </div>
            <div className="col-sm-2 custom-column">
              <div className="img-atendimento">
                <img
                  className="img"
                  alt=""
                  src={`http://covid-checker.sintegrada.com.br/storage/${paciente?.image}`}
                />
              </div>
            </div>
            <div className="col-sm-8 custom-column  aa">
              <div className="row">
                <div className="col">
                  <div className="div-item text-0 row">
                  
                  Nome : 
                
                    <div className="info-text col ">  {paciente.name} </div>
                   
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col">
                  <div className="div-item text-0 row">
                    Cpf:
                      <div className="info-text col "> {paciente.identifier}</div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <div className="div-item text-0 row">
                    Data de nascimento:
                    <div className="info-text col ">{paciente.birthdate}</div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <div className="div-item text-0 row">Condição</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataList;
