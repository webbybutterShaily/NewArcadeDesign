import React, { FC, useMemo, useState, useEffect } from "react";

import { clusterApiUrl } from "@solana/web3.js";

require("@solana/wallet-adapter-react-ui/styles.css");

import { Link, NavLink } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWallet } from "@fortawesome/free-solid-svg-icons";

import "../../assets/pugin/slicknav/slicknav.min.css";
import "../../assets/pugin/slicknav/jquery.slicknav.min.js";

import MobileMenu from "../mobile-menu";
import SideWallet from "../../pages/SideWallet/SideWallet"

import { withTranslation } from "react-i18next"
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
    <div className="topbar">
      <div className="brand">
        <a href="#" className="logo">
          <span>
            <img
              src="https://www.arcade2earn.io/wp-content/uploads/elementor/thumbs/logo_v_l-pizh4m20aqewe8t4mcvalg5goed32j5sv5b7rwu1og.png"
            //className="logo-sm"
            />
          </span>
        </a>
      </div>

      <nav className="navbar-custom">
        <ul className="list-unstyled topbar-nav header-action float-end mb-0">
          <li className="d-flex align-items-center">
            {/* <a className="nav-link btn btn-action"> */}

            {/* <WalletDisconnectButton /> */}
            {/* Your app's components go here, nested within the context providers. */}
            {/* </a> */}
          </li>

        </ul>
        <div id="navigation">
          <ul className="navigation-menu">
            <li className="nav-item ">
              <NavLink
                to="/"
                className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}
              >
                <span>{t('menu.dashboard')}</span>
              </NavLink>
            </li>
            <li className="nav-item ">
              <NavLink
                to="/mission-pools"
                className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}
              >
                <span>{t('menu.mission_pool')}</span>
              </NavLink>
            </li>
            {/*<li className="nav-item ">
              <NavLink
                to="/single-asset-staking"
                className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}
              >
                <span>{t('menu.single_asset_staking')}</span>
              </NavLink>
  </li>*/}
            <li className="nav-item ">
              <a href="https://raydium.io/swap/" className="nav-link" target={"_blank"}>
                <span>{t('menu.swap')}</span>
              </a>
            </li>
            <li className="nav-item ">
              <NavLink
                to="/warchest"
                className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}
              >
                <span>{t('menu.warchest')}</span>
              </NavLink>
            </li>
            {/*<li className="nav-item ">
              <NavLink
                to="/ranking"
                className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}
              >
                <span>{t('menu.rankings')}</span>
              </NavLink>
  </li>*/}
            <li className="nav-item">
              <div className='dropdown order-0 align-self-end' style={{ marginRight: "2rem" }}>
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
              </div>
            </li>
            <li className="nav-item "><button
              className="purple border-0" style={{ backgroundColor: "transparent" }}
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
            </li>
          </ul>
        </div>
      </nav>
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
