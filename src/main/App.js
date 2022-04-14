import React, { useEffect, useState, useMemo } from 'react';
import BaseRoute from './Router';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Helpers } from '../common';
import '../assets/css/theme.scss';
import { Header, Footer, MobileMenu } from '../components';
import '../assets/images/blur3.png';
import {
    WalletModalProvider
} from "@solana/wallet-adapter-react-ui";
import styled from "styled-components";
import { Account, Keypair, LAMPORTS_PER_SOL, PublicKey, clusterApiUrl, Connection } from "@solana/web3.js";
import { AccountInfo } from '@solana/spl-token'
import { useConnection, useWallet, useAnchorWallet, ConnectionContext } from '@solana/wallet-adapter-react';
import { DemoBalanceContext } from '../context/demo-accounts'
import {
    Program, Provider, web3, BN, utils
} from '@project-serum/anchor';
import * as serumCmn from '@project-serum/common';
import * as spl from '@solana/spl-token';
const request = require("axios");

const AppBg = styled.div`
    background-image:url(/assets/images/blur3.png)
`;

const App = () => {
    const wallet = useWallet();
    const opts = {
        preflightCommitment: "processed"
    }
    const anchorWallet = useAnchorWallet();
    const { connection } = useConnection();
    const { publicKey, sendTransaction } = useWallet();
    const [totalArcedeTokens, setTotalArcedeTokens] = useState(0);
    const [tokenAccounts, setTokenAccounts] = useState(undefined);
    const [ArcadeTokenAccounts, setArcadeTokenAccounts] = useState({ arcade: 0, xarcade: 0 });
    const [ArcadeRewards, setArcadeRewards] = useState({ unpaid: 0, total: 0 });
    useEffect(() => {
        Helpers.seo({
            title: "Arcade",
            metaDescription: "adasd"
        });
        $(function () {
            // console.log($('body').html());
        })

    }, []);

    async function getProvider() {
        const connection = new Connection(clusterApiUrl("devnet"), opts.preflightCommitment);
        const provider = new Provider(
            connection, wallet, opts.preflightCommitment
        )
        return provider;
    }

    const asdf = useEffect(async () => {

        await getAccountBalances();
        await getRewardBalances();
        return 0;
    }, [wallet]);

    async function initTokenAccounts() {
        if (tokenAccounts === undefined && anchorWallet !== null) {
            //const accounts = await listOwnedTokenAccounts();
            //console.log("Accounts: ", accounts);
            //setTokenAccounts(accounts);
        }
    }

    useEffect(async () => {
        initTokenAccounts();
        const tokenAccount = await serumCmn.getTokenAccount(getProvider(), new web3.PublicKey(wallet));
        const balance = tokenAccount.amount.toNumber();
        console.log("balance", balance);
    }, [wallet])

    async function checkBalance(wallet, set) {
        if (wallet === undefined) {
            return;
        }

        const program = getSASProgram();
        try {
            setError(undefined);
            const tokenAccount = await serumCmn.getTokenAccount(program.provider, new web3.PublicKey(wallet));
            const balance = tokenAccount.amount.toNumber();
            console.log("balance2", balance);
            set(balance);
        } catch (err) {
            setError("Failed to read token balance");
        }
    }

    async function getAccountBalances() {

        if (publicKey) {
            const res = await request.get('http://api.private.arcade2earn.io/api/demo/wallet/RCade47ZKErNcQB1CgkpEZUEmyfsqi2qh21mSCWASgm')
            setArcadeTokenAccounts(res.data)
        }
    }

    async function getRewardBalances() {
        if (publicKey) {
            const res = await request.get('http://api.private.arcade2earn.io/api/demo/rewards/RCade47ZKErNcQB1CgkpEZUEmyfsqi2qh21mSCWASgm')
            setArcadeRewards({ unpaid: res.data.unpaid, total: res.data.total })
        }
    }

    const [currency, setCurrency] = useState({
        from: "ARCADE",
        to: 'xARCADE'
    })
    const [direction, setDirection] = useState(false)
    const [amount, setAmount] = useState(0);

    return (
        <>
            <DemoBalanceContext.Provider
                value={{ ArcadeRewards, ArcadeTokenAccounts, setArcadeRewards, setArcadeTokenAccounts, getAccountBalances, publicKey, wallet, currency, setCurrency, direction, setDirection, amount, setAmount }}
            >
                <AppBg className="main-bg-overlay" />
                <div className="main-wrapper" id="outer-wrapper">
                    <WalletModalProvider>
                        <MobileMenu />
                        <Header />

                        <div id="content-cotainer">
                            <BaseRoute />
                        </div>
                        <Footer />
                    </WalletModalProvider>
                </div>
            </DemoBalanceContext.Provider>
        </>
    );
}


export default App;