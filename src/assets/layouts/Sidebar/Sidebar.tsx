// import React from 'react'
import { useState } from "react";
import { Link } from "react-router-dom";

import "./Sidebar.css";

import { IconType } from "react-icons";
import { BsHouseAdd } from "react-icons/bs";
import { AiOutlineMedicineBox } from "react-icons/ai";
import { MdLocalHospital } from "react-icons/md";

import { VscGraph } from "react-icons/vsc";

const Sidebar = () => {
  type Item = {
    text: string;
    icon: IconType;
    path: string;
  };

  const [activepath, setactivepath] = useState("/");
  // const [selected, setSelected] = useState(0);
  const menuItems: Item[] = [

    
    {
      text: "Home",
      icon: BsHouseAdd,
      path: "/",
    },
    {
      text: "analytics",
      icon: VscGraph,
      path: "/Graficos",
    },
    
  ];

  return (
    <>
      
      <div className="sidebar">
        <div className="top-section">
          <div className="logo">
            {" "}
            <MdLocalHospital /> <div className="logo-tex">COVIDDetect</div>{" "}
          </div>
        </div>
        <div className="line"></div>

        <div className="side-box">
          <div className="side-item">
            {menuItems.map((item) => (
              <div
                key={item.path}
                className={item.path === activepath ? "item active" : "item"}
                onClick={() => setactivepath(item.path)}
              >
                {/* ? - se */}
                <Link to={item.path} className="link">
                  {" "}
                  <div className="item-item">
                    <item.icon className="icon-side" size={20} />{" "}
                    <Link to={item.path}>{item.text} </Link>
                  </div>{" "}
                </Link>
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
              <div className="text">Acesse ao suporte pra saber mais . </div>
              <div className="btn-white">
                {" "}
                <Link
                  to="https://sintegrada.com.br/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {" "}
                  Acessar{" "}
                </Link>
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
