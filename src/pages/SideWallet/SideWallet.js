import { useWallet } from "@solana/wallet-adapter-react";
import React, { useEffect, useState } from "react";
import "./Sidewallet.css";
import { LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import { useConnection } from "@solana/wallet-adapter-react";

function SideWallet() {
  const [totalArcedeTokens, setTotalArcedeTokens] = useState(0);
  const [balance, setBalance] = useState(0);
  const [walletAddress, setWalletAddress] = useState("XXXXXXXXXXXXXXXX");
  const [copyAddressStatus, setCopyAddressStatus] = useState("Copy Address");
  const { publicKey } = useWallet();
  const { connection } = useConnection();

  const TOKEN_PROGRAM_ID = new PublicKey(
    "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
  );

  useEffect(() => {
    if (publicKey) {
      connection
        .getTokenAccountsByOwner(
          new PublicKey(new PublicKey(publicKey.toBase58())),
          {
            programId: TOKEN_PROGRAM_ID,
          }
        )
        .then((res) => {
          res.value.map((item) => {
            connection
              .getParsedAccountInfo(new PublicKey(item.pubkey.toBase58()))
              .then((res) => {
                const tokenAddress = res.value.data.parsed.info.mint;
                //Arcade token address
                const arcadeAddress =
                  "tToKcFtUUQvDqSWbqpEhvgXwTMzWNx7mDpvxKLALrkY";
                if (tokenAddress === arcadeAddress) {
                  setTotalArcedeTokens(
                    res.value.data.parsed.info.tokenAmount.uiAmount
                  );
                  setWalletAddress(res.value.data.parsed.info.owner);
                  setBalance(res.value.lamports / LAMPORTS_PER_SOL);
                }
              })
              .catch(() => setTotalArcedeTokens(0));
          });
        })
        .catch(() => setTotalArcedeTokens(0));
    } else {
      setTotalArcedeTokens(0);
      setBalance(0);
      setWalletAddress("XXXXXXXXXXXXXXXX");
    }
  }, [publicKey]);

  return (
    <div
      className="offcanvas offcanvas-end second "

      id="offcanvasRight"
      aria-labelledby="offcanvasRightLabel"
      style={{ zIndex: "9999", backgroundColor: "#1f2127" }}
    >
      <div className="offcanvas-header ">
        <h5 className="first" id="offcanvasRightLabel">
          <img
            src="data:image/svg+xml;base64,PHN2ZyBmaWxsPSJub25lIiBoZWlnaHQ9IjI0IiB2aWV3Qm94PSIwIDAgMjQgMjQiIHdpZHRoPSIyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Im0yMC4wMTU2IDYuNjQyODZoLTE0Ljg5MDZjLS4zNDUzMSAwLS42MjUtLjI3MTctLjYyNS0uNjA3MTUgMC0uMzM1NDQuMjc5NjktLjYwNzE0LjYyNS0uNjA3MTRoMTVjLjM0NTMgMCAuNjI1LS4yNzE3LjYyNS0uNjA3MTQgMC0xLjAwNTk2LS44Mzk1LTEuODIxNDMtMS44NzUtMS44MjE0M2gtMTQuMzc1Yy0xLjM4MDg2IDAtMi41IDEuMDg3MTctMi41IDIuNDI4NTd2MTIuMTQyODNjMCAxLjM0MTQgMS4xMTkxNCAyLjQyODYgMi41IDIuNDI4NmgxNS41MTU2YzEuMDk0NiAwIDEuOTg0NC0uODE3IDEuOTg0NC0xLjgyMTR2LTkuNzE0MzFjMC0xLjAwNDQ1LS44ODk4LTEuODIxNDMtMS45ODQ0LTEuODIxNDN6bS0xLjc2NTYgNy44OTI4NGMtLjY5MDIgMC0xLjI1LS41NDM4LTEuMjUtMS4yMTQzcy41NTk4LTEuMjE0MyAxLjI1LTEuMjE0MyAxLjI1LjU0MzggMS4yNSAxLjIxNDMtLjU1OTggMS4yMTQzLTEuMjUgMS4yMTQzeiIgZmlsbD0iI2YwZjhmZiIgZmlsbC1ydWxlPSJldmVub2RkIi8+PC9zdmc+"
            alt=""
          />{" "}
          Wallet
        </h5>
        <button
          type="button"
          className="btn-close text-reset"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        >
          <i className="bi bi-x-lg" style={{ color: "white" }}></i>
        </button>
      </div>
      <div className=" bgcol first p-4 ">
        <div
          className="d-flex justify-content-between"
          style={{ fontSize: "1.5rem", marginBottom: "3rem", color: "white" }}
        >
          <div
            className="address"
            data-bs-toggle="addressCopy"
            data-bs-placement="bottom"
            title={copyAddressStatus}
            style={{ display: "flex", justifyContent: "left" }}
            onMouseDown={() => {
              setCopyAddressStatus("Copied");
            }}
            onMouseUp={() => setCopyAddressStatus("Copy Address")}
          >
            <button
              type="button"
              className="small"
              style={{
                backgroundColor: "transparent",
                color: "white",
                border: "none",
              }}
              onClick={() => {
                navigator.clipboard.writeText(walletAddress);
              }}
              onMouseEnter={(e) => (e.target.style.transform = "scale(1.1)")}
              onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
            >
              {walletAddress.slice(0, 4)}..{walletAddress.slice(39, 43)}
            </button>
            <i className="bi bi-clipboard-check"></i>
          </div>
          <h5 className="small">Send ARC</h5>
        </div>
        <div className="d-flex  justify-content-center justify-content-center align-items-center p-3 gap-2">
          <div>
            <h1 className="text-white">{totalArcedeTokens}</h1>
          </div>
          <div className="polygon-circle">
            <img
              src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMTgiIHZpZXdCb3g9IjAgMCAyMCAxOCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTE1LjEwNDIgNS4zMTI0OUMxNC43Mzk2IDUuMTA0MTYgMTQuMjcwOCA1LjEwNDE2IDEzLjg1NDIgNS4zMTI0OUwxMC45Mzc1IDcuMDMxMjRMOC45NTgzMyA4LjEyNDk5TDYuMDkzNzUgOS44NDM3NEM1LjcyOTE3IDEwLjA1MjEgNS4yNjA0MiAxMC4wNTIxIDQuODQzNzUgOS44NDM3NEwyLjYwNDE3IDguNDg5NTdDMi4yMzk1OCA4LjI4MTI0IDEuOTc5MTcgNy44NjQ1NyAxLjk3OTE3IDcuMzk1ODJWNC43OTE2NkMxLjk3OTE3IDQuMzc0OTkgMi4xODc1IDMuOTU4MzIgMi42MDQxNyAzLjY5NzkxTDQuODQzNzUgMi4zOTU4MkM1LjIwODMzIDIuMTg3NDkgNS42NzcwOCAyLjE4NzQ5IDYuMDkzNzUgMi4zOTU4Mkw4LjMzMzMzIDMuNzQ5OTlDOC42OTc5MiAzLjk1ODMyIDguOTU4MzMgNC4zNzQ5OSA4Ljk1ODMzIDQuODQzNzRWNi41NjI0OUwxMC45Mzc1IDUuNDE2NjZWMy42NDU4MkMxMC45Mzc1IDMuMjI5MTYgMTAuNzI5MiAyLjgxMjQ5IDEwLjMxMjUgMi41NTIwN0w2LjE0NTgzIDAuMTA0MTU2QzUuNzgxMjUgLTAuMTA0MTc3IDUuMzEyNSAtMC4xMDQxNzcgNC44OTU4MyAwLjEwNDE1NkwwLjYyNSAyLjYwNDE2QzAuMjA4MzMzIDIuODEyNDkgMCAzLjIyOTE2IDAgMy42NDU4MlY4LjU0MTY2QzAgOC45NTgzMiAwLjIwODMzMyA5LjM3NDk5IDAuNjI1IDkuNjM1NDFMNC44NDM3NSAxMi4wODMzQzUuMjA4MzMgMTIuMjkxNyA1LjY3NzA4IDEyLjI5MTcgNi4wOTM3NSAxMi4wODMzTDguOTU4MzMgMTAuNDE2N0wxMC45Mzc1IDkuMjcwODJMMTMuODAyMSA3LjYwNDE2QzE0LjE2NjcgNy4zOTU4MiAxNC42MzU0IDcuMzk1ODIgMTUuMDUyMSA3LjYwNDE2TDE3LjI5MTcgOC45MDYyNEMxNy42NTYyIDkuMTE0NTcgMTcuOTE2NyA5LjUzMTI0IDE3LjkxNjcgOS45OTk5OVYxMi42MDQyQzE3LjkxNjcgMTMuMDIwOCAxNy43MDgzIDEzLjQzNzUgMTcuMjkxNyAxMy42OTc5TDE1LjEwNDIgMTVDMTQuNzM5NiAxNS4yMDgzIDE0LjI3MDggMTUuMjA4MyAxMy44NTQyIDE1TDExLjYxNDYgMTMuNjk3OUMxMS4yNSAxMy40ODk2IDEwLjk4OTYgMTMuMDcyOSAxMC45ODk2IDEyLjYwNDJWMTAuOTM3NUw5LjAxMDQyIDEyLjA4MzNWMTMuODAyMUM5LjAxMDQyIDE0LjIxODcgOS4yMTg3NSAxNC42MzU0IDkuNjM1NDIgMTQuODk1OEwxMy44NTQyIDE3LjM0MzdDMTQuMjE4NyAxNy41NTIxIDE0LjY4NzUgMTcuNTUyMSAxNS4xMDQyIDE3LjM0MzdMMTkuMzIyOSAxNC44OTU4QzE5LjY4NzUgMTQuNjg3NSAxOS45NDc5IDE0LjI3MDggMTkuOTQ3OSAxMy44MDIxVjguODU0MTZDMTkuOTQ3OSA4LjQzNzQ5IDE5LjczOTYgOC4wMjA4MiAxOS4zMjI5IDcuNzYwNDFMMTUuMTA0MiA1LjMxMjQ5WiIgZmlsbD0iI0YwRjhGRiIgZmlsbC1vcGFjaXR5PSIwLjY1Ii8+Cjwvc3ZnPgo="
              alt="Polygon Icon"
            />
          </div>
          <div className="ml-2">
            <div className="currency">ARC</div>
            <div className="chain small">Solana</div>
          </div>
        </div>

        <div
          className="d-flex justify-content-center"
          style={{ marginBottom: "3rem" }}
        >
          <h6>{balance} SOL</h6>
        </div>
        {/* <div className="d-flex justify-content-center gap-3 p-3">
          <div className="text-center">
            <button className="shape">
              <img
                className="icon"
                src="data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9IjI0IiB2aWV3Qm94PSIwIDAgMjQgMjQiIHdpZHRoPSIyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSIjZjBmOGZmIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Im0xMiAyMGMtNC40MTgyNzggMC04LTMuNTgxNzIyLTgtOHMzLjU4MTcyMi04IDgtOGMyLjEyMTczMTkgMCA0LjE1NjU2MzIuODQyODU0NzIgNS42NTY4NTQyIDIuMzQzMTQ1NzUgMS41MDAyOTExIDEuNTAwMjkxMDMgMi4zNDMxNDU4IDMuNTM1MTIyMzMgMi4zNDMxNDU4IDUuNjU2ODU0MjUgMCA0LjQxODI3OC0zLjU4MTcyMiA4LTggOHptMC0xOGMtNS41MjI4NDc1IDAtMTAgNC40NzcxNTI1LTEwIDEwIDAgMi42NTIxNjQ5IDEuMDUzNTY4NCA1LjE5NTcwNCAyLjkyODkzMjE5IDcuMDcxMDY3OCAxLjg3NTM2Mzc4IDEuODc1MzYzOCA0LjQxODkwMjkxIDIuOTI4OTMyMiA3LjA3MTA2NzgxIDIuOTI4OTMyMnM1LjE5NTcwNC0xLjA1MzU2ODQgNy4wNzEwNjc4LTIuOTI4OTMyMiAyLjkyODkzMjItNC40MTg5MDI5IDIuOTI4OTMyMi03LjA3MTA2NzgtMS4wNTM1Njg0LTUuMTk1NzA0MDMtMi45Mjg5MzIyLTcuMDcxMDY3ODFjLTEuODc1MzYzOC0xLjg3NTM2Mzc5LTQuNDE4OTAyOS0yLjkyODkzMjE5LTcuMDcxMDY3OC0yLjkyODkzMjE5eiIvPjxwYXRoIGQ9Im0xNS41OTI4OTMyIDguNDE3MTA2NzhjLS4zOS0uMzktMS4wMi0uMzktMS40MSAwbC0yLjE4Mjg5MzIgMi4xNzI4OTMyMi0yLjE4Mjg5MzIyLTIuMTgyODkzMjJjLS4zOS0uMzktMS4wMi0uMzktMS40MSAwcy0uMzkgMS4wMiAwIDEuNDFsMi4xODI4OTMyMiAyLjE4Mjg5MzIyLTIuMTgyODkzMjIgMi4xODI4OTMyYy0uMzkuMzktLjM5IDEuMDIgMCAxLjQxczEuMDIuMzkgMS40MSAwbDIuMTgyODkzMjItMi4xODI4OTMyIDIuMTgyODkzMiAyLjE4Mjg5MzJjLjM5LjM5IDEuMDIuMzkgMS40MSAwcy4zOS0xLjAyIDAtMS40MWwtMi4xODI4OTMyLTIuMTgyODkzMiAyLjE4Mjg5MzItMi4xODI4OTMyMmMuMzgtLjM4LjM4LTEuMDIgMC0xLjR6IiB0cmFuc2Zvcm09Im1hdHJpeCguNzA3MTA2NzggLjcwNzEwNjc4IC0uNzA3MTA2NzggLjcwNzEwNjc4IDEyIC00Ljk3MDU2MykiLz48L2c+PC9zdmc+"
                alt=""
              />
            </button>
            <h5>Top Up</h5>
          </div>

          <div className="text-center">
            <button className="shape">
              <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTgiIGhlaWdodD0iMTQiIHZpZXdCb3g9IjAgMCAxOCAxNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik00LjYxMjU4IDIuNzcxNDZMOS40OTMyOCAyLjc3MTQ2QzEwLjExNjYgMi43NzE0NiAxMC42Mjg2IDMuMjM4OTMgMTAuNjk4NSAzLjg0MzE0TDEwLjcwNjcgMy45ODQ4NEMxMC43MDY3IDQuNjU2MDggMTAuMTY0NSA1LjE5ODIzIDkuNDkzMjggNS4xOTgyM0g0LjYxMjU4VjcuMzg0MDRDNC42MTI1OCA3LjkzNDc5IDMuOTQ5OTUgOC4yMDE1NiAzLjU3MTMgNy44MjI5MkwwLjE4MDcxNyA0LjQzMjMzQy0wLjA2MDIzODkgNC4xOTEzOCAtMC4wNjAyMzg5IDMuODEyNzMgMC4xODA3MTcgMy41NzE3OEwzLjU3MTMgMC4xODExOTFDMy45NTg1NSAtMC4yMDYwNTkgNC42MTI1OCAwLjA2OTMxOTIgNC42MDM5NyAwLjYxMTQ2OUw0LjYxMjU4IDIuNzcxNDZaIiBmaWxsPSIjRjBGOEZGIi8+CjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNMTIuNzcxMiA4LjA3OTgxSDcuODkwNTFDNy4yNjcyMiA4LjA3OTgxIDYuNzU1MjQgOC41NDcyOCA2LjY4NTI4IDkuMTUxNDhMNi42NzcxMyA5LjI5MzE5QzYuNjc3MTMgOS45NjQ0MyA3LjIxOTI4IDEwLjUwNjYgNy44OTA1MSAxMC41MDY2SDEyLjc3MTJWMTIuNjkyNEMxMi43NzEyIDEzLjI0MzEgMTMuNDMzOCAxMy41MDk5IDEzLjgxMjUgMTMuMTMxM0wxNy4yMDMxIDkuNzQwNjhDMTcuNDQ0IDkuNDk5NzMgMTcuNDQ0IDkuMTIxMDggMTcuMjAzMSA4Ljg4MDEzTDEzLjgxMjUgNS40ODk1NEMxMy40MjUyIDUuMTAyMjkgMTIuNzcxMiA1LjM3NzY3IDEyLjc3OTggNS45MTk4MkwxMi43NzEyIDguMDc5ODFaIiBmaWxsPSIjRjBGOEZGIi8+Cjwvc3ZnPgo=" />
            </button>
            <h5>Transfer</h5>
          </div>
        </div> */}
      </div>
      {/* <h6 className="first p-2 ">
        Fast Transfer Method <span className="badge span1">BETA</span>
      </h6> */}
      <div className="accordion accordion-flush " id="accordionExample1">
        <div className="accordion-item ">
          <h2 className="accordion-header" id="headingOnee">
            <button
              className="accordion-button second "
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseOnee"
              aria-expanded="true"
              aria-controls="collapseOne"
            >
              Pending Rewards
            </button>
          </h2>
          <div
            id="collapseOnee"
            className="accordion-collapse collapse second"
            aria-labelledby="headingOnee"
            data-bs-parent="#accordionExample1"
          >
            <div className="accordion-body">
              <a href="#">
                <h6 className="second">Pending Rewards</h6>
              </a>

            </div>
          </div>
        </div>
      </div>
      <div className="accordion accordion-flush " id="accordionExample">
        <div className="accordion-item ">
          <h2 className="accordion-header " id="headingOne">
            <button
              className="accordion-button  second "
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseOne"
              aria-expanded="true"
              aria-controls="collapseOne"
            >
              My Missions
            </button>
          </h2>
          <div
            id="collapseOne"
            className="accordion-collapse collapse "
            aria-labelledby="headingOne"
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body second">
              <a href="#">
                <h6 className="second">My Missions</h6>
              </a>

              <div
                className="accordion accordion-flush "
                id="accordionExample2"
              >
                <div className="accordion-item ">

                  <div
                    id="collapseOne2"
                    className="accordion-collapse collapse "
                    aria-labelledby="headingOne2"
                    data-bs-parent="#accordionExample2"
                  >
                    <div className="accordion-body"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SideWallet;
