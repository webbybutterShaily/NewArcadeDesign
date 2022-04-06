import React, { useEffect } from 'react';
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

const AppBg = styled.div`
    background-image:url(/assets/images/blur3.png)
`;

const App = () => {
    useEffect(() => {
        Helpers.seo({
            title: "Arcade -",
            metaDescription: "adasd"
        });
        $(function () {
            // console.log($('body').html());
        })

    }, []);

    return (
        <>
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
        </>
    );
}


export default App;