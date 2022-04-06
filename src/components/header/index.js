import React, { FC, useMemo } from "react";

import { clusterApiUrl } from "@solana/web3.js";

require("@solana/wallet-adapter-react-ui/styles.css");

import { Link, NavLink } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWallet } from "@fortawesome/free-solid-svg-icons";

import "../../assets/pugin/slicknav/slicknav.min.css";
import "../../assets/pugin/slicknav/jquery.slicknav.min.js";

import MobileMenu from "../mobile-menu";
import SideWallet from "../../pages/SideWallet/SideWallet"

import {withTranslation} from "react-i18next"

const Header = ({t}) => {

  
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
                className="nav-link"
                exact
                activeClassName="active"
              >
                <span>{t('menu.dashboard')}</span>
              </NavLink>
            </li>
            <li className="nav-item ">
              <NavLink
                to="/mission-pools"
                className="nav-link"
                activeClassName="active"
              >
                <span>{t('menu.mission_pool')}</span>
              </NavLink>
            </li>
            <li className="nav-item ">
              <a href="https://raydium.io/swap/" className="nav-link" activeClassName="active">
                <span>{t('menu.swap')}</span>
              </a>
            </li>
            <li className="nav-item ">
              <NavLink
                to="/warchest"
                className="nav-link"
                activeClassName="active"
              >
                <span>{t('menu.warchest')}</span>
              </NavLink>
            </li>
            <li className="nav-item ">
              <NavLink
                to="/ranking"
                className="nav-link"
                activeClassName="active"
              >
                <span>{t('menu.rankings')}</span>
              </NavLink>
            </li>
            <li className="nav-item "><button
                  className="purple border-0" style={{backgroundColor:"transparent"}}
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
              <SideWallet/>
              </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default withTranslation()(Header);
