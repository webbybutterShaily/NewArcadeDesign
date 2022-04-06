import React, { createRef } from 'react';
import styled from 'styled-components';
import NumberFormat from "react-number-format"
const ref = createRef()
const FieldGroup = styled.div`
    display:block;
    background: #000829;
    border-radius: 4px;

    label{
        padding: 0.75rem 1rem 0px;
        font-size: 12px;
        line-height: 14px;
        color: #85858d;
    }
    .helper-text{
        margin: 0px;
        font-weight: 400;
        font-size: 11px;
        color: #979aad;
        line-height: 1.2;
        padding: 0.75rem 1rem 0px;
    }

    .input-inline{
        padding: 0.75rem 0.75rem 0.75rem 1rem;
        display:flex;
        justify-content:space-between;
        input{
            width: 0;
            padding: 0;
            border: none;
            background-color: transparent;
            font-weight: 600;
            font-size: 16px;
            line-height: 24px;
            flex: 1 1 auto;
            color: #f1f1f2;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;

            &:hover,&:focus, &:focus-visible{
                outline: 0;
            }
        }

        span{
            padding: 0.5rem;
            line-height: 24px;
            border: none;
            background-color: transparent;
            font-weight: 600;
            font-size: 14px;
            border-radius: 4px;
            white-space: nowrap;
            cursor: pointer;
            
        }
    }
`;
import { useTranslation } from 'react-i18next';

const ExchangeField = (props) => {
    const {t} = useTranslation()
    return (
        <FieldGroup className={props.className}>
            <div className='d-flex justify-content-between'>
                <label>{props.label}</label>
                <p className='helper-text'>
                    {t('pages.single_asset_staking.swap_balance_label')}
                    : {(props.token == "xARCADE" ? props.balance.xarcade : props.balance.arcade)}</p>

            </div>

            <div className='input-inline'>
                {/* <input type={"text"} placeholder='0,00' ref={ref} id={`${props.label}_value`} /> */}
                <NumberFormat thousandSeparator={true}  placeholder="000" className="some" inputmode="numeric" />
                <span className='token-label'>
                    {props.token}
                </span>
            </div>
        </FieldGroup>
    );
}

export default ExchangeField;