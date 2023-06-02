// import React from 'react'
// import { useState } from 'react';
import { Link } from "react-router-dom";

import "./Sidebar.css";

import { IconType } from "react-icons";
import { BsHouseAdd } from "react-icons/bs";
import { AiOutlineMedicineBox } from "react-icons/ai";
import { FaLaptopMedical } from "react-icons/fa";
import { MdOutlineMedicalServices } from "react-icons/md";

const Sidebar = () => {
  type Item = {
    text: string;
    icon: IconType;
    path: string;
  };

  // const [selected, setSelected] = useState(0);
  const menuItems: Item[] = [
    {
      text: "Home",
      icon: BsHouseAdd,
      path: "/home",
    },
    {
      text: "Atendimento",
      icon: MdOutlineMedicalServices,
      path: "/atendimento",
    },
  ];

  return (
    <>
      {/* className={`sidebar ${isClicked ? 'blue' : 'white'}`}
      onClick={handleClick} */}

      <div className="sidebar">
        <div className="top-section">
          <div className="logo">
            {" "}
            <FaLaptopMedical /> <div>System</div>{" "}
          </div>
        </div>
        <div className="line"></div>

        <div className="side-box">
        <div className="side-item">
          {menuItems.map((item) => (
            <div key={item.path} className="item " >
            
          
             <Link to={item.path}  className="link"> <div className="item-item"><item.icon className="icon-side" size={20}  />    <Link to={item.path}  >{item.text} </Link></div>  <div className="item-item"> </div> </Link>
            </div>
          ))}
        </div>
        </div>

        <div className="footer-sidebar">
          <div className="box">
            <div className="box-item">
              <div className="icon">
                <AiOutlineMedicineBox />
              </div>
              <div className="text">
                Acesse ao suporte pra saber  mais  .{" "}
              </div>
              <div className="btn-white">
                {" "}
                <Link to=""> Acessar </Link>
                {/* https://sintegrada.com.br/ */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;