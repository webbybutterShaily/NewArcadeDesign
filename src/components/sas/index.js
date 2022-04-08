import React, { useContext } from 'react';
import { Page, ExchangeField } from '../../components'
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExchangeAlt } from '@fortawesome/free-solid-svg-icons'
import { DemoBalanceContext } from '../../context/demo-accounts'
import { useTranslation } from 'react-i18next';

const request = require("axios");
const ExchangeDivider = styled.div`
    position:relative;
    padding:0.7rem 0;
    text-align:center;
    button{
        height: 32px;
        width: 32px;
        border-radius: 50%;
        background: #000829;
        cursor: pointer;
        border: 0px;
        color: #fff;
        font-size: 12px;
        svg{
            transform: rotate(90deg);
        }   
    }
`;

const SAS = (props) => {


    const { ArcadeTokenAccounts, setArcadeTokenAccounts, currency, setCurrency, direction, setDirection, amount, setAmount } = useContext(
        DemoBalanceContext
      );
    
    const disclaimer = "*There is a 1% fee for swapping $xArcade back for $Arcade.*"
    const swapFunction = () => {
        props.nextStep();
        var fromA, toA = "";
        if (direction) {
            fromA = "arcade";
            toA = "xarcade";
        } else {
            fromA = "xarcade";
            toA = "arcade"
        }

        request.post('http://arcade.api.private.aioxperts.com/api/demo/swap', {
            address: "RCade47ZKErNcQB1CgkpEZUEmyfsqi2qh21mSCWASgm",
            from: fromA,
            to: toA,
            amount: 50
        })
    }
    return (
        <div>
            <ExchangeField balance={ArcadeTokenAccounts} label={props.t('pages.single_asset_staking.swap_from_label')} className={"mt-3"} token={currency.from}  
            t={props.t}
            />

            <ExchangeDivider>
                <button type='button' onClick={() => {
                    setCurrency({
                        from: currency.to,
                        to: currency.from
                    });
                    setDirection((direction ? false : true));
                }}>
                    <FontAwesomeIcon icon={faExchangeAlt} />
                </button>
            </ExchangeDivider>

            <ExchangeField balance={ArcadeTokenAccounts} label={props.t('pages.single_asset_staking.swap_to_label')} token={currency.to} />

            <div className='d-flex align-items-center justify-content-between mt-3'>
                <div className='text-label'></div>
                <div className='inline-option'>
                    <div className={`text-label`}>
                        <span>Fee: {(direction ? 1 : 0)}%</span>
                    </div>
                </div>
            </div>
            <div className='mt-4 mb-3 text-center'>
                <a href='#' className='btn btn-action px-4' style={{ width: '100%' }} onClick={() => {
                    swapFunction();
                }}>
                    {/* <FontAwesomeIcon icon={faExchangeAlt}/> */}
                    <span>{props.t('pages.single_asset_staking.swap_button')}</span>
                </a>
            </div>
            <div className='mt-4 mb-3'><span className={"text-label"}>{(direction ? disclaimer : '')}</span></div>
        </div>
    );
}

export default SAS;