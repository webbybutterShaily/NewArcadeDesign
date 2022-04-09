import React, { useCallback, useMemo, useState, useEffect } from "react";
import {
  Page,
  Carousel,
  MissionItem,
  MissionItemModal,
  Footer,
} from "../../components";
import {
  Account,
  Keypair,
  LAMPORTS_PER_SOL,
  PublicKey,
  clusterApiUrl,
  Connection,
} from "@solana/web3.js";
import { AccountInfo } from "@solana/spl-token";
import {
  useConnection,
  useWallet,
  useAnchorWallet,
  ConnectionContext,
} from "@solana/wallet-adapter-react";
import { DemoBalanceContext } from "../../context/demo-accounts";
import { Program, Provider, web3, BN, utils } from "@project-serum/anchor";
import * as serumCmn from "@project-serum/common";
import * as spl from "@solana/spl-token";

import { withTranslation, useTranslation } from "react-i18next";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Sidebar from "../../components/sidebar";

const sliderSettings = {
  dots: false,
  arrows: false,
  infinite: true,
  speed: 700,
  slidesToShow: 3,
  slidesToScroll: 1,
  autoplay: false,
  margin: 20,
};

const request = require("axios");
const TOKEN_PROGRAM_ID = new PublicKey(
  "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
);

const WidgetBottomComponent = (props) => {
  const { t } = useTranslation();

  const [modalState, setModalState] = useState({ isOpen: false });
  const [MissionState, setMissionState] = useState({
    _id: "",
    mission_mint: "",
    title: "",
    max_pool_size: 0,
    duration: 0,
    expected_rewards: 0,
    expected_rewards_coin: "",
    game: "",
    default_image: "",
    description: "",
  });

  return (
    <div className="home-widget-bottom">
      <a
        href="#"
        className="action-component text-link"
        onClick={() => {
          setModalState({ isOpen: true });
          setMissionState(props.data);
        }}
      >
        {t("pages.dashboard.mission_pool_details_link")}
      </a>
    </div>
  );
};

const Dashboard = (props) => {
  const { t } = useTranslation();
  const opts = {
    preflightCommitment: "processed",
  };
  const wallet = useWallet();
  const anchorWallet = useAnchorWallet();
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();
  const [totalArcedeTokens, setTotalArcedeTokens] = useState(0);
  const [tokenAccounts, setTokenAccounts] = useState(undefined);
  const [ArcadeTokenAccounts, setArcadeTokenAccounts] = useState({
    arcade: 0,
    xarcade: 0,
  });
  const [ArcadeRewards, setArcadeRewards] = useState({ unpaid: 0, total: 0 });

  const [ArcadeMissions, setArcadeMissions] = useState([
    {
      _id: "",
      mission_mint: "",
      title: "1",
      max_pool_size: 0,
      duration: 0,
      expected_rewards: 0,
      expected_rewards_coin: "",
      game: "",
      default_image: "",
      description: "card 1",
    },
    {
      _id: "",
      mission_mint: "",
      title: "2",
      max_pool_size: 0,
      duration: 0,
      expected_rewards: 0,
      expected_rewards_coin: "",
      game: "",
      default_image: "",
      description: "card 2",
    },
    {
      _id: "",
      mission_mint: "",
      title: "3",
      max_pool_size: 0,
      duration: 0,
      expected_rewards: 0,
      expected_rewards_coin: "",
      game: "",
      default_image: "",
      description: "card 3",
    },
    {
      _id: "",
      mission_mint: "",
      title: "3",
      max_pool_size: 0,
      duration: 0,
      expected_rewards: 0,
      expected_rewards_coin: "",
      game: "",
      default_image: "",
      description: "card 3",
    },
    {
      _id: "",
      mission_mint: "",
      title: "3",
      max_pool_size: 0,
      duration: 0,
      expected_rewards: 0,
      expected_rewards_coin: "",
      game: "",
      default_image: "",
      description: "card 3",
    },
  ]);

  const slider = React.useRef(null);
  const [modalState, setModalState] = useState({ isOpen: false });
  const [MissionState, setMissionState] = useState({
    _id: "",
    mission_mint: "",
    title: "",
    max_pool_size: 0,
    duration: 0,
    expected_rewards: 0,
    expected_rewards_coin: "",
    game: "",
    default_image: "",
    description: "",
  });

  ///////

  async function listOwnedTokenAccounts() {
    const provider = getProvider();
    const accounts = await getOwnedTokenAccounts(
      provider.connection,
      anchorWallet.publicKey
    );
    return accounts;
  }

  async function getProvider() {
    const connection = new Connection(
      clusterApiUrl("devnet"),
      opts.preflightCommitment
    );
    const provider = new Provider(connection, wallet, opts.preflightCommitment);
    return provider;
  }

  const FAILED_TO_FIND_ACCOUNT = "Failed to find token account";
  const INVALID_ACCOUNT_OWNER = "Invalid account owner";

  async function getOrCreateAssociatedTokenAccountInstrs(
    provider,
    mint,
    owner
  ) {
    let associatedTokenAddress = await utils.token.associatedAddress({
      mint,
      owner,
    });

    try {
      const _ = await serumCmn.getTokenAccount(
        provider,
        associatedTokenAddress
      );
      return [associatedTokenAddress, []];
    } catch (err) {
      // INVALID_ACCOUNT_OWNER can be possible if the associatedAddress has
      // already been received some lamports (= became system accounts).
      // Assuming program derived addressing is safe, this is the only case
      // for the INVALID_ACCOUNT_OWNER in this code-path
      if (
        err.message === FAILED_TO_FIND_ACCOUNT ||
        err.message === INVALID_ACCOUNT_OWNER
      ) {
        let createTokenAccountInstr =
          spl.Token.createAssociatedTokenAccountInstruction(
            spl.ASSOCIATED_TOKEN_PROGRAM_ID,
            TOKEN_PROGRAM_ID,
            mint,
            associatedTokenAddress,
            owner,
            provider.wallet.publicKey
          );
        return [associatedTokenAddress, [createTokenAccountInstr]];
      } else {
        throw err;
      }
    }
  }

  async function getOwnedTokenAccounts(connection, publicKey) {
    console.log("filters about to set");
    let filters = getOwnedAccountsFilters(publicKey);
    // @ts-ignore
    console.log("resp laoding");
    let resp = await connection._rpcRequest("getProgramAccounts", [
      TOKEN_PROGRAM_ID.toBase58(),
      {
        commitment: connection.commitment,
        filters,
        encoding: "base64",
      },
    ]);
    if (resp.error) {
      throw new Error(
        "failed to get token accounts owned by " +
        publicKey.toBase58() +
        ": " +
        resp.error.message
      );
    }

    console.log("resp.result", resp.result);
    return (
      resp.result
        // @ts-ignore
        .map(({ pubkey, account: { data } }) => {
          const [b64data, encoding] = data;
          data = Buffer.from(b64data, encoding);
          return {
            publicKey: new web3.PublicKey(pubkey),
            account: data,
          };
        })
    );
  }

  function parseTokenAccountData(data) {
    // @ts-ignore
    let { mint, owner, amount } = serumCmn.token.ACCOUNT_LAYOUT.decode(data);
    return {
      mint: new web3.PublicKey(mint),
      owner: new web3.PublicKey(owner),
      amount,
    };
  }

  // @ts-ignore
  function getOwnedAccountsFilters(publicKey) {
    return [
      {
        memcmp: {
          // @ts-ignore
          offset: serumCmn.token.ACCOUNT_LAYOUT.offsetOf("owner"),
          bytes: publicKey.toBase58(),
        },
      },
      {
        dataSize: serumCmn.token.ACCOUNT_LAYOUT.span,
      },
    ];
  }

  async function initTokenAccounts() {
    if (tokenAccounts === undefined && anchorWallet !== null) {
      //const accounts = await listOwnedTokenAccounts();
      //console.log("Accounts: ", accounts);
      //setTokenAccounts(accounts);
    }
  }

  /*async function listOwnedTokenAccounts() {
        const accounts = await getOwnedTokenAccounts(connection, publicKey);
        return accounts;
    }*/
  const asdf = useEffect(async () => {
    await getAccountBalances();
    await getRewardBalances();
    await getMissionPool();
    return 0;
  }, [wallet]);

  useEffect(async () => {
    initTokenAccounts();
    const tokenAccount = await serumCmn.getTokenAccount(
      getProvider(),
      new web3.PublicKey(wallet)
    );
    const balance = tokenAccount.amount.toNumber();
    console.log("balance", balance);
  }, [wallet]);

  async function checkBalance(wallet, set) {
    if (wallet === undefined) {
      return;
    }

    const program = getSASProgram();
    try {
      setError(undefined);
      const tokenAccount = await serumCmn.getTokenAccount(
        program.provider,
        new web3.PublicKey(wallet)
      );
      const balance = tokenAccount.amount.toNumber();
      console.log("balance2", balance);
      set(balance);
    } catch (err) {
      setError("Failed to read token balance");
    }
  }

  ///////

  async function getAccountBalances() {
    if (publicKey) {
      const res = await request.get(
        "http://arcade.api.private.aioxperts.com/api/demo/wallet/RCade47ZKErNcQB1CgkpEZUEmyfsqi2qh21mSCWASgm"
      );
      setArcadeTokenAccounts(res.data);
    }
  }

  async function getRewardBalances() {
    if (publicKey) {
      const res = await request.get(
        "http://arcade.api.private.aioxperts.com/api/demo/rewards/RCade47ZKErNcQB1CgkpEZUEmyfsqi2qh21mSCWASgm"
      );
      setArcadeRewards({ unpaid: res.data.unpaid, total: res.data.total });
    }
  }

  async function getMissionPool() {
    console.log("getMissionPool");
    const res = await request.get(
      "http://arcade.api.private.aioxperts.com/api/demo/missions"
    );
    setArcadeMissions(res.data);
    console.log("res      ========================================== ");
  }

  return (
    // <Page title={t("pages.dashboard.html_page_title")}>

    <div className="container-fluid">
      <div className="row  ">
        <div
          className="col max-width-20 p-0 border-right-violet"
        >
          <Sidebar />
        </div>
        <div className="col p-0 " style={{ width: '77%' }}>
          <div className="row row-cols-1 m-0">
            <div className="col px-0 border-bottom-violet">
              <div className="row  m-0">
                <div
                  className="col border-right-violet" style={{ maxWidth: '46%', padding: '2.2rem' }}
                >
                  <div className="d-flex justify-content-between">
                    <div style={{ color: "#e019f9" }}>
                      <div >Mission Pool Count</div>
                      <h1 className=" mb-0" style={{ fontSize: '5em' }}>9</h1>
                    </div>
                    <div className="align-self-end" style={{ fontSize: '12px' }}>MISSIONS</div>
                  </div>
                </div>
                <div
                  className="col border-right-violet" style={{ padding: '2.2rem' }}
                >
                  <div className="d-flex justify-content-between align-items-center">
                    <div style={{ color: "#e019f9" }}>
                      <div >Total xArcade Locked</div>
                      <h1  style={{ fontSize: '5em' }}>915,454</h1>
                    </div>
                    <img
                      src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"
                      alt="failed to laod logo images"
                      style={{ width: "5rem", height: "5rem" }}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div
              className="col p-3"
            >
              <div className="m-3">
                <div className="d-flex justify-content-between mb-4">
                  <span style={{ color: "#e019f9" }}>Active Mission Pools</span>
                  <div>
                    {" "}
                    <button
                      style={{ background: "transparent", border: "none" }}
                      onClick={() => slider?.current?.slickPrev()}
                    >
                      <i
                        class="bi bi-chevron-left"
                        style={{ color: "#fece02" }}
                      ></i>
                    </button>
                    <button
                      style={{ background: "transparent", border: "none" }}
                      onClick={() => slider?.current?.slickNext()}
                    >
                      <i
                        class="bi bi-chevron-right"
                        style={{ color: "#fece02" }}
                      ></i>
                    </button>
                  </div>
                </div>

                <Slider ref={slider} {...sliderSettings}>
                  {ArcadeMissions.map((item, index) => (
                    <div className="">
                      <div
                        class="card me-4"
                        style={{
                          // width: "15rem",
                          borderRadius: "0.5rem",
                          border: "1px solid #e019f9",

                        }}
                        key={index}
                      >
                        <div className="position-relative">
                          <img
                            src="https://cdn.pixabay.com/photo/2021/11/13/23/06/tree-6792528__340.jpg"
                            class="card-img-top"
                            style={{
                              borderBottom: "1px  solid #e019f9",
                              borderTopLeftRadius: "0.5rem",
                              borderTopRightRadius: "0.5rem",
                            }}
                            alt="..."
                          />
                          <button
                            className="bg-transparent details-btn px-3"
                            type="button"
                          >
                            Details
                          </button>
                        </div>
                        <div
                          class="card-body p-0"
                          style={{
                            backgroundColor: "#140024",
                            borderBottomLeftRadius: "0.5rem",
                            borderBottomRightRadius: "0.5rem",
                          }}
                        >
                          <div
                            className="p-2 ps-3"
                            style={{ borderBottom: "1px  solid #e019f9" }}
                          >
                            <p
                              className="text-secondary mb-0"
                              style={{ fontSize: "10px" }}
                            >
                              Mission
                            </p>
                            <span style={{ color: "#fece02", fontSize: "14px" }}>
                              Fimbul Ecos Tree Arrow Ship Mission
                            </span>
                          </div>
                          <div className="row m-0">
                            <div
                              className="p-2 ps-3 col-3"
                              style={{ borderRight: "1px solid #e019f9" }}
                            >
                              <p
                                className="text-secondary mb-0"
                                style={{ fontSize: "10px" }}
                              >
                                Pool Size
                              </p>
                              <span
                                className="text-white"
                                style={{ fontSize: "14px" }}
                              >
                                8000
                              </span>
                            </div>
                            <div
                              className="p-2 ps-3 col-3"
                              style={{ borderRight: "1px solid #e019f9" }}
                            >
                              <p
                                className="text-secondary mb-0"
                                style={{ fontSize: "10px" }}
                              >
                                Durations
                              </p>
                              <span
                                className="text-white"
                                style={{ fontSize: "14px" }}
                              >
                                4 days
                              </span>
                            </div>
                            <div className="p-2 ps-3 col-6">
                              <p
                                className="text-secondary mb-0"
                                style={{ fontSize: "10px" }}
                              >
                                Expected Rewards
                              </p>
                              <span
                                className="text-white"
                                style={{ fontSize: "14px" }}
                              >
                                480 ATLAS
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </Slider>

                <DemoBalanceContext.Provider
                  value={{
                    ArcadeRewards,
                    ArcadeTokenAccounts,
                    setArcadeRewards,
                    setArcadeTokenAccounts,
                    getAccountBalances,
                  }}
                >
                  <MissionItemModal
                    t={t}
                    data={MissionState}
                    account={{
                      arcade: ArcadeTokenAccounts.arcade,
                      xarcade: ArcadeTokenAccounts.xarcade,
                      rewards: ArcadeRewards,
                    }}
                    isOpen={modalState.isOpen}
                    closeModal={() => setModalState({ isOpen: false })}
                  />
                </DemoBalanceContext.Provider>
              </div>
            </div>
            <div className="col ps-0">
              <Footer />
            </div>
          </div>
        </div>

        {/* <div className="col-12 col-sm-4 col-lg-4">
          <div className="card shadow-widget h-100">
            <div className="card-body">
              <div className="card-header-title">
                <h3 className="card-title text-center text-gradient">
                  {t("pages.dashboard.bonus_pool_rankings_header")}
                </h3>
              </div>
              <div className="dashboard-widget-body">
                <div className="list-item">
                  <div className="list-label">Mission Pool Count</div>
                </div>
                <div className="list-item">
                  <div className="list-label">Number</div>
                </div>
                <div className="list-item">
                  <div className="list-label">Rank</div>
                </div>

                <div className="list-item mt-4">
                  <div className="list-label">Mission Pool Count</div>
                </div>
                <div className="list-item">
                  <div className="list-label">Number</div>
                </div>
                <div className="list-item">
                  <div className="list-label">Rank</div>
                </div>
                <div className="list-item mt-4">
                  <div className="list-label">Mission Pool Count</div>
                </div>
                <div className="list-item">
                  <div className="list-label">Number</div>
                </div>
                <div className="list-item">
                  <div className="list-label">Rank</div>
                </div>
              </div>
            </div>
          </div>
        </div> */}
      </div>
      {/* </Page> */}
    </div>
  );
};

export default withTranslation()(Dashboard);

{
  /* <div className="list-item">
                    <div className="list-label">Address</div>
                    <div className="list-value">
                      {publicKey ? publicKey.toBase58() : "xxxxxxxxxxxxxxxxx"}
                    </div>
                  </div>
                  <div className="list-item">
                    <div className="list-label">
                      {t("pages.dashboard.wallet_header")} ARCADE Balance
                    </div>
                    <div className="list-value">
                      <span className="balance-text">
                        {ArcadeTokenAccounts.arcade} ARCADE
                      </span>
                    </div>
                  </div>
                  <div className="list-item">
                    <div className="list-label">xARCADE Balance</div>
                    <div className="list-value">
                      <span className="balance-text">
                        {ArcadeTokenAccounts.xarcade} xARCADE
                      </span>
                    </div>
                  </div> */
}
