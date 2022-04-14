import React, { FC, useMemo, useState, useEffect } from "react";

import { clusterApiUrl } from "@solana/web3.js";

require("@solana/wallet-adapter-react-ui/styles.css");

import { Link, NavLink } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWallet } from "@fortawesome/free-solid-svg-icons";

import "../../assets/pugin/slicknav/slicknav.min.css";
import "../../assets/pugin/slicknav/jquery.slicknav.min.js";

import MobileMenu from "../mobile-menu";
import SideWallet from "../../pages/SideWallet/SideWallet";

import { withTranslation } from "react-i18next";
import i18n from '../../i18n';

const Header = ({ t }) => {
  
  const [selectedLanguage, setSelectedLanguage] = useState("");

  const getLang = useEffect(() => {
    setSelectedLanguage(languages.filter(itm => itm.lng == i18n.resolvedLanguage)[0].lng);
  }, [i18n])

  const languages = [
    { 'name': "English", 'lng': "en" },
    { 'name': "Italiano", 'lng': "it" },
    { 'name': "Korean", 'lng': "kr" },
    { 'name': "Japanese", 'lng': "jp" },
    { 'name': "Hindi Indian", 'lng': "hi" },
    { 'name': "Français", 'lng': "fr" },
    { 'name': "Español", 'lng': "es" },
    { 'name': "简体", 'lng': "zh-CN" },
    { 'name': "中文", 'lng': "zh-TW" },
    { 'name': "Deutsch", 'lng': "de" },
  ]

  return (
    <div className="container-fluid border-bottom-violet" >
      <div className="row ">
        <div className="col max-width-20 py-2">
          <div className="brand d-flex justify-content-center h-100 ">
            <a href="#" className="logo d-flex align-items-center">
              <span>
                <img
                  src="https://www.arcade2earn.io/wp-content/uploads/elementor/thumbs/logo_v_l-pizh4m20aqewe8t4mcvalg5goed32j5sv5b7rwu1og.png"
                  style={{ maxHeight: "2rem" }}
                  //className="logo-sm"
                />
              </span>
              <span className="fw-bold ms-2 " style={{ color: "#fece02" }}>
                ARCADE
              </span>
            </a>
          </div>
        </div>
        <div className="col text-uppercase fw-bold" style={{ height: 'inherit' }}>
          {/* <div id="navigation"> */}
          <div
            className="row  h-100 "
            style={{ width: "-webkit-fill-available" }}
          >
            <div
              className="col h-100  p-0 border-left-violet"
            >
              <NavLink
                to="/"
                className={`nav-link font-12  h-100 d-flex align-items-center justify-content-center`}
                exact
                style={({ isActive }) => ({
                  color: isActive ? "#411565" : "#e019f9",
                  background: isActive ? "#e019f9" : null,
                })}
              >
                {/* <span style={{ fontSize: "10px", color: "#e019f9" }}> */}
                {t("menu.dashboard")}
                {/* </span> */}
              </NavLink>
            </div>
            <div
              className="col p-0 border-left-violet"
            >
              <NavLink
                to="/mission-pools"
                className={`nav-link font-12  h-100 d-flex align-items-center justify-content-center`}
                exact
                style={({ isActive }) => ({
                  color: isActive ? "#ffffff" : "#e019f9",
                  background: isActive ? "#e019f9" : null,
                })}
              >
                {t("menu.mission_pool")}
              </NavLink>
            </div>

            <div
              className="col  p-0 border-left-violet"
            >
              <a
                href="https://raydium.io/swap/"
                className={`nav-link font-12  h-100 d-flex align-items-center justify-content-center`}
                activeClassName="active"
                style={{ color: "#e019f9" }}
              >
                {t("menu.swap")}
              </a>
            </div>

            <div
              className="col  p-0 border-left-violet"
            >
              <NavLink
                to="/warchest"
                className={`nav-link font-12  h-100 d-flex align-items-center justify-content-center`}
                exact
                style={({ isActive }) => ({
                  color: isActive ? "#ffffff" : "#e019f9",
                  background: isActive ? "#e019f9" : null,
                })}
              >
                {t("menu.warchest")}
              </NavLink>
            </div>
            <div
              className="col  p-0 border-left-violet dropdown"
            >
                              <button className='btn  dropdown-toggle text-white fw-bold' style={{ backgroundColor: "#53095d" }} type='button' data-bs-toggle='dropdown' area-aria-expanded='false'>
                  {selectedLanguage}
                </button>
                <ul className='dropdown-menu rounded' style={{ backgroundColor: "#2c2d30" }}>
                  {languages.map((item, index) => {
                    return (

                      <li style={{ marginRight: '1.1rem', marginLeft: "1.1rem" }} key={index}>
                        <span className='dropdown-item text-white rounded text-center' onClick={() => { setSelectedLanguage(item.lng); console.log("Language: ", item); i18n.changeLanguage(item.lng) }}
                          onMouseEnter={mouseEnterEvents} onMouseLeave={mouseLeaveEvents}>
                          {item.name}
                        </span>
                      </li>
                    )
                  })}
                </ul>

              {/* <NavLink
                to="/ranking"
                className={`nav-link font-12  h-100 d-flex align-items-center justify-content-center`}
                exact
                style={({ isActive }) => ({
                  color: isActive ? "#ffffff" : "#e019f9",
                  background: isActive ? "#e019f9" : null,
                })}
              >
                {t("menu.rankings")}
              </NavLink> */}
            </div>
            <div
              className="col-1 border-left-violet h-100 d-flex align-items-center justify-content-center"
            >
              <button
                className="purple border-0  "
                style={{ backgroundColor: "transparent" }}
                type="button"
                data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasRight"
                aria-controls="offcanvasRight"
              >
                <img
                  src="data:image/svg+xml;base64,PHN2ZyBmaWxsPSJub25lIiBoZWlnaHQ9IjI0IiB2aWV3Qm94PSIwIDAgMjQgMjQiIHdpZHRoPSIyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Im0yMC4wMTU2IDYuNjQyODZoLTE0Ljg5MDZjLS4zNDUzMSAwLS42MjUtLjI3MTctLjYyNS0uNjA3MTUgMC0uMzM1NDQuMjc5NjktLjYwNzE0LjYyNS0uNjA3MTRoMTVjLjM0NTMgMCAuNjI1LS4yNzE3LjYyNS0uNjA3MTQgMC0xLjAwNTk2LS44Mzk1LTEuODIxNDMtMS44NzUtMS44MjE0M2gtMTQuMzc1Yy0xLjM4MDg2IDAtMi41IDEuMDg3MTctMi41IDIuNDI4NTd2MTIuMTQyODNjMCAxLjM0MTQgMS4xMTkxNCAyLjQyODYgMi41IDIuNDI4NmgxNS41MTU2YzEuMDk0NiAwIDEuOTg0NC0uODE3IDEuOTg0NC0xLjgyMTR2LTkuNzE0MzFjMC0xLjAwNDQ1LS44ODk4LTEuODIxNDMtMS45ODQ0LTEuODIxNDN6bS0xLjc2NTYgNy44OTI4NGMtLjY5MDIgMC0xLjI1LS41NDM4LTEuMjUtMS4yMTQzcy41NTk4LTEuMjE0MyAxLjI1LTEuMjE0MyAxLjI1LjU0MzggMS4yNSAxLjIxNDMtLjU1OTggMS4yMTQzLTEuMjUgMS4yMTQzeiIgZmlsbD0iI2YwZjhmZiIgZmlsbC1ydWxlPSJldmVub2RkIi8+PC9zdmc+"
                  alt=""
                />{" "}
              </button>
              <SideWallet />
            </div>
          </div>
          {/* </div> */}
        </div>
      </div>

    </div>
  );
};
const mouseEnterEvents = (e) => {
  e.target.style.cursor = "pointer";
  e.target.style.backgroundColor = 'black'
}
const mouseLeaveEvents = (e) => {
  e.target.style.cursor = "pointer";
  e.target.style.backgroundColor = 'transparent'
}

export default withTranslation()(Header);

