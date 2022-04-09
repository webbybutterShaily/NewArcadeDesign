import React, { FC, useMemo } from "react";
import {
  WalletModalProvider,
  WalletDisconnectButton,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
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

const Header = ({ t }) => {
  const menu = [
    {
      title: "DASHBOARD",
      link: "/",
    },
    {
      title: "MISSION POOLS",
      link: "/mission-pools",
    },
    {
      title: "SWAP",
      link: "/",
    },
    {
      title: "WARCHEST",
      link: "/",
    },
    {
      title: "RANKINGS",
      link: "/",
    },
  ];

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
              className="col  p-0 border-left-violet"
            >
              <NavLink
                to="/ranking"
                className={`nav-link font-12  h-100 d-flex align-items-center justify-content-center`}
                exact
                style={({ isActive }) => ({
                  color: isActive ? "#ffffff" : "#e019f9",
                  background: isActive ? "#e019f9" : null,
                })}
              >
                {t("menu.rankings")}
              </NavLink>
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

      {/* <nav className="navbar-custom">
        <ul className="list-unstyled topbar-nav header-action float-end mb-0">
          <li className="d-flex align-items-center">
            <WalletMultiButton />
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
                <span>{t("menu.dashboard")}</span>
              </NavLink>
            </li>
            <li className="nav-item ">
              <NavLink
                to="/mission-pools"
                className="nav-link"
                activeClassName="active"
              >
                <span>{t("menu.mission_pool")}</span>
              </NavLink>
            </li>
            <li className="nav-item ">
              <NavLink
                to="/single-asset-staking"
                className="nav-link"
                activeClassName="active"
              >
                <span>{t("menu.single_asset_staking")}</span>
              </NavLink>
            </li>
            <li className="nav-item ">
              <a
                href="https://raydium.io/swap/"
                className="nav-link"
                activeClassName="active"
              >
                <span>{t("menu.swap")}</span>
              </a>
            </li>
            <li className="nav-item ">
              <NavLink
                to="/rewards"
                className="nav-link"
                activeClassName="active"
              >
                <span>{t("menu.rewards")}</span>
              </NavLink>
            </li>
            <li className="nav-item ">
              <NavLink
                to="/warchest"
                className="nav-link"
                activeClassName="active"
              >
                <span>{t("menu.warchest")}</span>
              </NavLink>
            </li>
            <li className="nav-item ">
              <NavLink
                to="/ranking"
                className="nav-link"
                activeClassName="active"
              >
                <span>{t("menu.rankings")}</span>
              </NavLink>
            </li>
            <li className="nav-item ">
              <button
                className="purple border-0"
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
            </li>
          </ul>
        </div>
      </nav> */}
    </div>
  );
};

export default withTranslation()(Header);

{
  /* <div className="row row-cols-2 ">
<div className="col-10">
  <div className="row row-cols-5 ">
    <div
      className="col-auto"
      style={{
        border: "0.5px solid #e019f9",
        borderBottom: "0px",
      }}
    >
      <NavLink
        to="/"
        className="nav-link"
        exact
        activeClassName="active"
        style={{ color: "#e019f9" }}
      >
        <span>{t("menu.dashboard")}</span>
      </NavLink>
    </div>
    <div
      className="col-auto"
      style={{
        border: "0.5px solid #e019f9",
        borderBottom: "0px",
      }}
    >
      {" "}
      <NavLink
        to="/mission-pools"
        className="nav-link"
        activeClassName="active"
        style={{ color: "#e019f9" }}
      >
        <span>{t("menu.mission_pool")}</span>
      </NavLink>
    </div>
    <div
      className="col-auto"
      style={{
        border: "0.5px solid #e019f9",
        borderBottom: "0px",
      }}
    >
      {" "}
      <a
        href="https://raydium.io/swap/"
        className="nav-link"
        activeClassName="active"
        style={{ color: "#e019f9" }}
      >
        <span>{t("menu.swap")}</span>
      </a>
    </div>
    <div
      className="col-auto"
      style={{
        border: "0.5px solid #e019f9",
        borderBottom: "0px",
      }}
    >
      {" "}
      <NavLink
        to="/warchest"
        className="nav-link"
        activeClassName="active"
        style={{ color: "#e019f9" }}
      >
        <span>{t("menu.warchest")}</span>
      </NavLink>
    </div>
    <div
      className="col-auto"
      style={{
        border: "0.5px solid #e019f9",
        borderBottom: "0px",
      }}
    >
      <NavLink
        to="/ranking"
        className="nav-link"
        activeClassName="active"
        style={{ color: "#e019f9" }}
      >
        <span>{t("menu.rankings")}</span>
      </NavLink>
    </div>
  </div>
</div>
<div
  className="col-auto"
  style={{ border: "0.5px solid #e019f9", borderBottom: "0px" }}
>
  <button
    className="purple border-0"
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
</div> */
}
