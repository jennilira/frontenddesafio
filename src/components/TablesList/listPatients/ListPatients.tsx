import React, { useEffect, useState } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";

import "./Listpatients.css";

axios.defaults.headers.common["Accept"] = "application/json";
interface DataItem {
  name: string;
  identifier: string;
  phone_number: string;
  birthdate: string;
  image: string | undefined | File | boolean;
  id: number;
 
}

interface ApiResponse {
  data: DataItem[];
}

// hummmmm vai dar errado

const ListPatients: React.FC = () => {
  const [data, setData] = useState<DataItem[]>([]);

  const fetchData = async () => {
    try {
      const response = await axios.get<ApiResponse>(
        "http://localhost:8989/api/patients"
      );
      setData(response?.data?.data);
      // setData(response?.data?.data);  olha aaaa
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
    console.log(data);
  }, [data]);

  return (
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
            <th>Data de nascimento</th>

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
                      alt=""
                      // width="50px"
                      src={`http://localhost:8989/api/patients/${item?.image}`}
                    />
                  </div>
                </td>

                <td>{item?.identifier}</td>
                <td>{item?.phone_number}</td>
                <td>{item?.birthdate}</td>

                <td width="5%"></td>
                <td width="5%"></td>
                <td width="5%">
                  <div className="btn">
                    <Link
                      to={`/product/edit/${item.id}`}
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
    </div>
  );
};

export default ListPatients;
{
  /* um negocio aqui de mudar condiçoa */
}

{
  /* um link pegando o id sabe */
}
