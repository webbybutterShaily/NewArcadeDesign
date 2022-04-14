import React, { FC, useMemo } from "react";
require("@solana/wallet-adapter-react-ui/styles.css");

import { withTranslation } from "react-i18next";

const SideBar = ({ t }) => {
    return(
        <>
        <div className="row row-cols-1 m-0">
            {/* Wallet */}
            <div
              className="col p-0 border-bottom-violet"
              
            >
              <div className="card shadow-widget h-100">
                <div className="card-body p-4 my-2">
                  <div className="d-flex flex-column">
                    <div
                      className="d-flex justify-content-between align-items-center mb-3 p-1"
                      style={{ color: "#fece02" }}
                    >
                      <div className="fs-6">Wallet</div>
                      <div style={{ fontSize: "10px" }}>
                        <u>Wallet Address</u>
                      </div>
                    </div>
                    <div
                      className="d-flex justify-content-between p-1"
                      style={{
                        borderBottom: "0.5px solid #473954",
                        color: "#473954",
                      }}
                    >
                      <div>
                        {" "}
                        <p className="tet-secondary mb-2" style={{ fontSize: "11px" }}>
                          ARCADE Balance
                        </p>
                        <h5 className="text-light">$5,208.11</h5>
                      </div>{" "}
                      <p
                        className="tet-secondary align-self-end fw-bold mb-2"
                        style={{ fontSize: "11px" }}
                      >
                        ARCADE
                      </p>
                    </div>
                    <div
                      className="d-flex justify-content-between p-1 mt-2"
                      style={{
                        borderBottom: "0.5px solid #473954",
                        color: "#473954",
                      }}
                    >
                      <div>
                        {" "}
                        <p className="tet-secondary mb-2" style={{ fontSize: "11px" }}>
                          xARCADE Balance
                        </p>
                        <h5 className="text-light">621,023</h5>
                      </div>{" "}
                      <p
                        className="tet-secondary align-self-end fw-bold mb-2"
                        style={{ fontSize: "11px" }}
                      >
                        XARCADE
                      </p>
                    </div>
                  </div>

                  <div className="dashboard-widget-body mt-2">
                    <div className="list-item">
                      <button
                        className="btn btn-primary btn-action text-uppercase"
                        style={{
                          width: "100%",
                          fontSize: "12px",
                          fontWeight: "600",
                          padding: "1.2rem",
                        }}
                        onClick={() =>
                          window.open(
                            "https://ftx.us/pay/request?address=RCade47ZKErNcQB1CgkpEZUEmyfsqi2qh21mSCWASgm&tag=&wallet=sol&memoIsRequired=false&memo=&allowTip=true",
                            "_blank",
                            "resizable,width=700,height=900"
                          )
                        }
                      >
                        Buy Arcade with FTX US
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Reward Center */}
            <div className="col p-0" >
              <div className="card shadow-widget h-100">
                <div className="card-body p-4 my-2">
                  <div className="d-flex flex-column">
                    <div
                      className="d-flex justify-content-between align-items-center mb-3  p-1"
                      style={{ color: "#fece02" }}
                    >
                      <p className="fs-6">Reward Center</p>
                    </div>
                    <div
                      className="d-flex justify-content-between p-1"
                      style={{
                        borderBottom: "0.5px solid #473954",
                        color: "#473954",
                      }}
                    >
                      <div>
                        {" "}
                        <p className="tet-secondary mb-2" style={{ fontSize: "11px" }}>
                          Reward Balance
                        </p>
                        <h5 className="text-light">$5,208.11</h5>
                      </div>{" "}
                      <p
                        className="tet-secondary align-self-end fw-bold mb-2"
                        style={{ fontSize: "11px" }}
                      >
                        ARCADE
                      </p>
                    </div>
                    <div
                      className="d-flex justify-content-between p-1 mt-2"
                      style={{                          
                        borderBottom: "0.5px solid #473954",
                        color: "#473954",
                      }}
                    >
                      <div>
                        {" "}
                        <p className="tet-secondary mb-2" style={{ fontSize: "11px" }}>
                          Total Rewards Earned
                        </p>
                        <h5 className="text-light">621,023</h5>
                      </div>{" "}
                      <p
                        className="tet-secondary align-self-end fw-bold mb-2"
                        style={{ fontSize: "11px" }}
                      >
                        XARCADE
                      </p>
                    </div>
                  </div>

                  <div className="dashboard-widget-body mt-2">
                    <div className="list-item">
                      <button
                        className="btn btn-primary btn-action text-uppercase"
                        style={{
                          width: "100%",
                          fontSize: "12px",
                          fontWeight: "600",
                          padding: "1.2rem",
                        }}
                        onClick={() =>
                          window.open(
                            "https://ftx.us/pay/request?address=RCade47ZKErNcQB1CgkpEZUEmyfsqi2qh21mSCWASgm&tag=&wallet=sol&memoIsRequired=false&memo=&allowTip=true",
                            "_blank",
                            "resizable,width=700,height=900"
                          )
                        }
                      >
                        Claim Rewards
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* third card*/}
            {/* <div className="col-12 col-sm-4 col-lg-4">
                    <div className="card shadow-widget h-100">
                        <div className="card-body">
                            <div className="card-header-title">
                                <h3 className="card-title text-center text-gradient">{t('pages.dashboard.platform_details_header')}</h3>
                            </div>
                            <div className="dashboard-widget-body">
                                <div className="list-item">
                                    <div className="list-label">
                                        Mission Pool Count
                                    </div>
                                    <div className='list-value'>
                                        9 Missions Active
                                    </div>
                                </div>
                                <div className="list-item">
                                    <div className="list-label">
                                        Total $xARCADE Deposited
                                    </div>
                                    <div className='list-value'>
                                        5,215 $xARCADE
                                    </div>
                                </div>
                                <div className="list-item">
                                    <div className="list-label">
                                        Total $ARCADE Locked
                                    </div>
                                    <div className='list-value'>
                                        141,752 $ARCADE
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                 */}
          </div>
        </>
    )
};

export default withTranslation()(SideBar);
