import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Listpatients.css";
import { differenceInYears } from "date-fns";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// import PatientTable from './PatientTable';
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";
import { RxCaretLeft, RxCaretRight } from "react-icons/rx";
import { FiArrowRight } from "react-icons/fi";
import { BiTrashAlt } from "react-icons/bi";
import ListPatients from "./ListPatients";
import "./pageslink";
import Pagination from "./pageslink";

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

interface PaginationLink {
  label: string;
  active: boolean;
  onClick: () => void;
  link: number;
}

interface PaginationProps {
  // links: PaginationLink[];
  links: PaginationLink[];
  onPageChange: (page: number) => void;
}

const PaginationExample: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [lastPage, setLastPage] = useState<number>(1);
  // const [links, setLinks] = useState<number>(1);
  const [links, setLinks] = useState<PaginationLink[]>([]); // Alterado o tipo para PaginationLink[]
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
      setLinks(
        meta.links.map((link: any) => ({
          label: link.label,
          active: link.active,
          // onClick: () => handlePageChange(link.label)
        }))
      );
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

 
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
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
  const deleteData = async (id:number ) => {
    try {
      const response = await axios.delete(
        `http://covid-checker.sintegrada.com.br/api/patients/${id}`
      );
      console.log("Dado excluído com sucesso:", response.data);
      toast.success('Paciente excluído com  sucesso!');
    } catch (error) {
      console.error("Erro ao excluir dado:", error);
      toast.error('Ocorreu um erro !');
    }
  };

  return (
    <div>
      <div>
        <Table className="table-container">
          <div className="header-table">
            <p className="texto1"> Relatorio de pacientes</p>
            <p className="texto2"> informaçoes pessoais dos pacientes </p>
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
                <th>deletar</th>
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
                          to={`/atendimento/${item.id} `}
                          className="btn card-btn "
                        >
                          <FiArrowRight />
                        </Link>
                      </div>
                    </td>
                    <td>
                      <div className="btn">
                        <BiTrashAlt
                          size={25}
                          onClick={() => deleteData(item?.id)}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </Table>
        <ToastContainer />
      </div>
      <div className="d-flex justify-content-center pr-4">
        {/* <button
            className="btn-pagination pagination"
            onClick={handlePrevPage}
            disabled={currentPage === 1}
          >
            <RxCaretLeft size={34} />
          </button> */}
        <Pagination
          links={links}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />

        {/* <button 
            className="btn-pagination pagination"
            onClick={handleNextPage}
            disabled={currentPage === lastPage}
          >
            <RxCaretRight  size={34}/
            >
          </button> */}
      </div>
    </div>
  );
};

export default PaginationExample;
