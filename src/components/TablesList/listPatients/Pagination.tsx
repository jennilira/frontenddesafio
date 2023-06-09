import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Listpatients.css";
import { differenceInYears } from "date-fns";

// import PatientTable from './PatientTable';
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";
import { RxCaretLeft, RxCaretRight } from "react-icons/rx";
import { FiArrowRight } from "react-icons/fi";

import ListPatients from "./ListPatients";
import { Pagination } from "react-bootstrap";

interface Patient {
  name: string;
  identifier: string;
  phone_number: string;
  birthdate: string;
  image: File | null | undefined;
  id: number;

  // Defina a estrutura dos dados do paciente conforme necessário
}

interface AgeCalculatorProps {
  birthdate: string; // Alterado para tipo string
}

const PaginationExample: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [lastPage, setLastPage] = useState<number>(1);
  const [links, setLinks] = useState<number>(1);
  const [data, setData] = useState<Patient[]>([]);

  useEffect(() => {
    fetchData(currentPage);
    // console.log(currentPage)
    // console.log(setLinks)
  }, [currentPage]);

  const fetchData = async (page: number) => {
    try {
      const response = await axios.get(
        `http://covid-checker.sintegrada.com.br/api/patients?page=${page}`
      );
      const { data, meta } = response.data;
      setData(data);
      setLastPage(meta.last_page);
      setLinks(meta.links);
      console.log(meta.links);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < lastPage) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const AgeCalculator: React.FC<AgeCalculatorProps> = ({ birthdate }) => {
    const age = differenceInYears(new Date(), new Date(birthdate)); // Conversão para Date

    return (
      <div>
        {/* <p>Data de nascimento: {new Date(birthdate).toLocaleDateString()}</p>{" "} */}
        {/* Conversão para Date */}
        <p>Idade: {age}</p>
      </div>
    );
  };

  //BEM AQUI SERIA A PAGINAÇAO...
  // interface PaginationLink {
  //   label: string;
  //   active: boolean;
  //   onClick: () => void;
  // }

  // interface PaginationProps {
  //   links: PaginationLink[];
  // }

  // const Pagination: React.FC<PaginationProps> = ({ links }) => {
  //   return (
  //     <ul className="pagination">
  //       {links.map((link, index) => (
  //         <li key={index} className={`page-item ${link.active ? 'active' : ''}`}>
  //           <button className="page-link" onClick={link.onClick}>{link.label}</button>
  //         </li>
  //       ))}
  //     </ul>
  //   );
  // };

  return (
    <div>
      <div>
        <Table className="table-container">
          <div className="header-table">
            <p className="texto1"> Relatorio de pacientes</p>
            <p className="texto2"> aqui esta informaçoes dos pacientes </p>
          </div>

          <Table className="table-table">
            <thead>
              <tr>
                <th>id</th>
                <th>image</th>
                <th>name</th>
                <th>Cpf</th>
                <th>Telefone</th>
                <th>idade</th>

                <th>condiçâo </th>
                <th>atendimento</th>
              </tr>
            </thead>
            <tbody>
              {data?.length > 0 &&
                data?.map((item, i) => (
                  <tr key={item.id}>
                    <td>{item?.id}</td>

                    <td>
                      <div className="product-image">
                        <img
                          src={`http://covid-checker.sintegrada.com.br/storage/${item?.image}`}
                          alt="{item?.image}"
                        />
                      </div>
                    </td>
                    <td>{item?.name}</td>
                    <td>{item?.identifier}</td>
                    <td>{item?.phone_number}</td>

                    <td>
                      <AgeCalculator birthdate={item.birthdate} />
                    </td>

                    <td width="5%"></td>
                    <td width="5%">
                      <div className="btn">
                        <Link
                          to={`/atendimento/${item.id}`}
                          className="btn card-btn "
                      
                        >
                          <FiArrowRight />
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </Table>

        <div className="d-flex justify-content-center pr-4">
          <button
            className="btn-pagination"
            onClick={handlePrevPage}
            disabled={currentPage === 1}
          >
            <RxCaretLeft />
          </button>

          <button
            className="btn-pagination"
            onClick={handleNextPage}
            disabled={currentPage === lastPage}
          >
            <RxCaretRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaginationExample;
