import React, {useEffect, useState, useContext} from 'react';
import { DemoBalanceContext } from '../../context/demo-accounts'

import styles from './styles.scss';
const request = require('axios');
const StackForm = (props) => {
    const { ArcadeTokenAccounts, getAccountBalances } = useContext(
        DemoBalanceContext
      );
    const nextStep = async (type) => {
        if(type == "Staked"){
            await stakeAmount();
        }else if(type == "Unstaked"){
            await unstakeAmount();
        }
        props.updateState({type: type, amount: amountToStake});
        return props.nextStep();
    }

    const [StakedAccount, setStakedAccount] = useState(0);
    const [amountToStake, setAmountToStake] = useState(0.00)
    async function getStakedAmount() {
        console.log("props on stackForm: ", props.data)
        const res = await request.get(`http://arcade.api.private.aioxperts.com/api/demo/mission/staked/${props.data.mission_mint}/RCade47ZKErNcQB1CgkpEZUEmyfsqi2qh21mSCWASgm`)
        console.log('staked: ', res.data)
        setStakedAccount(res.data)
    }

    async function stakeAmount(){
        const res = await request.post(`http://arcade.api.private.aioxperts.com/api/demo/mission/stake`, {mint: props.data.mission_mint, amount: amountToStake, address: "RCade47ZKErNcQB1CgkpEZUEmyfsqi2qh21mSCWASgm"})
        //console.log("staked: ", res);
        getAccountBalances()
        getStakedAmount();
        return res.data
    }

    async function unstakeAmount(){
        const res = await request.post(`http://arcade.api.private.aioxperts.com/api/demo/mission/unstake`, {mint: props.data.mission_mint, amount: amountToStake, address: "RCade47ZKErNcQB1CgkpEZUEmyfsqi2qh21mSCWASgm"})
        getAccountBalances()
        getStakedAmount();
        return res.data;
    }

    const asdf = useEffect(async () => {
        await getStakedAmount();
        return 0;
    },[]);

    return(
        <>
        <div className='row my-3'>
            <div className='col-md-6 mx-auto'>
                <div className='asset-header '>
                    <div className='asset-info'>
                        <div className='asset-logo'>
                            <img src={`assets/images/${props.data.default_image}`}/>
                        </div>
                        <h2 className='asset-title'>{props.data.title}</h2>
                    </div>
                    <div className='detail d-sm-block d-none'>
                        <ul>
                            <li>
                                <div className='asset-detail'>
                                {props.data.duration} Days
                                </div>
                            </li>
                            <li>
                                <div className='asset-detail'>
                                ~{props.data.expected_rewards} {props.data.expected_rewards_coin}
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div className='row '>
            <div className='col-md-6 mt-5'>
                <div className='card shadow-widget stake-card'>
                    <div className='card-body'>
                        <div className="card-header-title">
                            <h3 className="card-title text-center text-gradient">Stake</h3>
                        </div>
                        <form className='stake-form mx-xl-5'>
                            <div className='wallet-info'>
                                <div className='text-label'>Wallet Balance</div>
                                <div className='balance-amount'>{ArcadeTokenAccounts.xarcade.toLocaleString()} <span className='balance-name'>xArcade</span></div>
                            </div>
                            <div className='text-label mb-1'>Amount to Stake (Min : 0.01)</div>

                            <div className='amount-input'>
                                <input type="text" className='amount-input__field' placeholder='0.00' onChange={(amount)=>setAmountToStake(parseFloat(amount.target.value))} />
                                <span className='alt-addon'>xArcade</span>
                            </div>
                            <div className='text-center mt-4'>
                                <a href='#' onClick={() => nextStep('Staked')} className='btn btn-action px-3'>Stake</a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div className='col-md-6 mt-5'>
                <div className='card shadow-widget stake-card'>
                    <div className='card-body'>
                        <div className="card-header-title">
                            <h3 className="card-title text-center text-gradient">Unstake</h3>
                        </div>
                        <form className='stake-form mx-xl-5'>
                            <div className='wallet-info'>
                                <div className='text-label'>Staked xArcade Balance</div>
                                <div className='balance-amount'>{StakedAccount} <span className='balance-name'>xArcade</span></div>
                            </div>
                            <div className='text-label mb-1'>Amount to Unstake (Min : 0.01)</div>
                            <div className='amount-input'>
                                <input type="text" className='amount-input__field' placeholder='0.00' onChange={(amount)=>setAmountToStake(parseFloat(amount.target.value))} />
                                <span className='alt-addon'>xArcade</span>
                            </div>

                            <div className='text-center mt-4'>
                                <a href='#' onClick={() => nextStep('Unstaked')} className='btn btn-action px-3'>Unstake</a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}

export default StackForm;