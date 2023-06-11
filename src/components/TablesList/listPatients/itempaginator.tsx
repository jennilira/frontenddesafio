import React, { useEffect, useState } from "react";
import Condition from "../../condition";
import { differenceInYears } from "date-fns";
import { BiTrashAlt } from "react-icons/bi";
import { FiArrowRight } from "react-icons/fi";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

interface AgeCalculatorProps {
  birthdate: string; // Alterado para tipo string
}
interface Symptom {
  id: number;
  name: string;
  created_at: null | Date;
  updated_at: null | Date;
}
interface Paciente {
  name: string;
  identifier: string;
  phone_number: string;
  birthdate: string;
  image: File | null | undefined;
  id: number;
  //
}

interface CondicaoAtendimentoData {
  patient_id: number;
  atendimento: string;
  id: string;
  paciente: Paciente;
  sintomasSelecionados: Symptom[];
}

interface ItemProps {
  item: Paciente;
}

const Itempaginator: React.FC<ItemProps> = ({ item }) => {
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

  const deleteData = async (id: number) => {
    try {
      const response = await axios.delete(
        `http://covid-checker.sintegrada.com.br/api/patients/${id}`
      );
      console.log("Dado excluído com sucesso:", response.data);
      toast.success("Paciente excluído com  sucesso!");
    } catch (error) {
      console.error("Erro ao excluir dado:", error);
      toast.error("Ocorreu um erro !");
    }
  };

  const [atendimento, setAtendimento] = useState<CondicaoAtendimentoData[]>([]);
  // const [atendimento, setAtendimento] = useState<CondiçãoAtendimentoData | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://covid-checker.sintegrada.com.br/api/patients/${item?.id}/attendances`
        );
        setAtendimento(response.data.data[response.data.data.length - 1]);
      } catch (error) {
        console.error("Erro ao obter os dados atendimento :", error);
      }
    };

    fetchData();
  }, [item?.id]);

  return (
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

      <td width="5%">
        <Condition atendimento={atendimento} />
      </td>
      <td width="5%">
        <div className="btn">
          <Link to={`/atendimento/${item.id} `} className="btn card-btn ">
            <FiArrowRight />
          </Link>
        </div>
      </td>
      <td>
        <div className="btn">
          <BiTrashAlt size={25} onClick={() => deleteData(item?.id)} />
        </div>
      </td>
    </tr>
  );
};

export default Itempaginator;
