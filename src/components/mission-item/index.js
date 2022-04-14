import React, { useEffect, useState } from 'react';
import styles from './styles.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGamepad } from '@fortawesome/free-solid-svg-icons'
import { withTranslation, useTranslation } from 'react-i18next';

import styled from 'styled-components';
const request = require("axios");

const ItemStyle = styled.div`
    padding:20px 10px;
`;

const CustomArrow = (props) => {
    // const {t} = useTranslation()
    const { className, style, onClick } = props;
    return (
        <div>

        </div>
    );
}

const MissionItem = (props) => {
    const { t } = useTranslation();
    const [game_image, setGameImage] = useState("assets/images/star-atlas.png")
    //console.log("MissionItem Props", props)
    const asdf = useEffect(() => {
        switch (props.data.game) {
            case "Star_Atlas":
                setGameImage("assets/images/star-atlas.png");
                break;
            case "Illuvium":
                setGameImage("assets/images/illuvium.png");
                break;
            case "Altered_State_Machines":
                setGameImage("assets/images/asm/asm-logo.png");
                break;
            case "Heroes_of_Mavia":
                setGameImage("https://statics.mavia.com/landing/public/images/logo-dark.svg?w=128&q=75")
                break;
            default :
                setGameImage("assets/images/star-atlas.png")
        }
    }, [props.data])

    return (
        <ItemStyle>
            <div className="card shadow-widget hover hover__slide-up pool-item">
                <div className="card-body">
                    <div className="pool-item__header">
                        {props.topLogo &&
                            <div className="header-logo">
                                <img src={game_image} />
                            </div>}
                        <div className="pool-title">
                            {props.data.title}                            
                        </div>
                    </div>
                    <div className="pool-item__body">
                        <div className="body-media">
                            <img src={`assets/images/${props.data.default_image}`} />
                        </div>
                        <div className="body-detail">
                            <ul className="detail-list">
                                <li>
                                    <div className="item-left">{t('pages.mission_pools.pool_size_label')} </div>
                                    <div className="item-right">{props.data.max_pool_size}</div>
                                </li>
                                <li>
                                    <div className="item-left">{t('pages.mission_pools.duration_label')} : </div>
                                    <div className="item-right">{props.data.duration} days</div>
                                </li>
                                <li>
                                    <div className="item-left">{t('pages.mission_pools.expecited_rewards_label')} : </div>
                                    <div className="item-right">{props.data.expected_rewards} {props.data.expected_rewards_coin}</div>
                                </li>
                            </ul>
                            {props.actionButton &&
                                <div className="text-center my-4">
                                    <button type='button' onClick={props.onAction} className='btn btn-action '>
                                        <FontAwesomeIcon icon={faGamepad} />
                                        <span>
                                            {t('pages.mission_pools.enter_pool_button')}
                                            </span>
                                    </button>
                                </div>}
                        </div>
                    </div>
                    <div className="pool-item__footer">
                        {!props.bottomComponent &&
                            <>
                                <div className="footerTitle">
                                    {t('pages.mission_pools.sponsored_by_label')}
                                </div>
                                <div className="sponsored-list">
                                    <ul className="list-inline d-flex justify-content-sm-around">
                                        {props.data.sponsors.map((sponsors, i)=>
                                            <li className="sponsored-item">
                                                <img src={sponsors.company_logo}/>
                                            </li>
                                        )}
                                    </ul>
                                </div>
                            </>
                        }

                        <div
                            onClick={props.onAction}
                            style={{ width: "max-content", margin: "auto" }}
                            onMouseOver={(e) => {
                                e.target.style.cursor = "pointer";
                            }}
                        >
                            {props.bottomComponent && props.bottomComponent}
                        </div>
                    </div>
                </div>
            </div>
        </ItemStyle>
    );
}

MissionItem.defaultProps = {
    actionButton: false,
    bottomComponent: null,
    topLogo: true
}

export default MissionItem;