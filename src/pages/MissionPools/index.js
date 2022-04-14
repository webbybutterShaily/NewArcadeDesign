import React, { useState, useEffect, createContext } from 'react';
import { Page, Carousel, MissionItem, MissionItemModal } from '../../components'
import { DemoBalanceContext } from '../../context/demo-accounts'
import { withTranslation, useTranslation } from 'react-i18next';

const request = require("axios");
const MissionPools = (props) => {
    const { t } = useTranslation();

    const [gameOption, setGameOption] = useState([])


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
        description: ""
    });
    const [ArcadeMissions, setArcadeMissions] = useState([
        {
            _id: "",
            mission_mint: "",
            title: "",
            max_pool_size: 0,
            duration: 0,
            expected_rewards: 0,
            expected_rewards_coin: "",
            game: "Star Atlas",
            default_image: "",
            description: ""
        }
    ])
    const [filteredMissions, setFilterMission] = useState(ArcadeMissions.filter(item => item.game == gameOption[0]))
    const [ArcadeTokenAccounts, setArcadeTokenAccounts] = useState({ arcade: 0, xarcade: 0 });
    const [ArcadeRewards, setArcadeRewards] = useState({ amount: 0 });
    const [selectedGame, setSelectedGame] = useState("ALL");

    async function getMissionPool() {
        const res = await request.get('http://api.private.arcade2earn.io/api/demo/missions')
        console.log("missionPool Data", res.data)
        var games = ["ALL"]
        var missions_first = []
        var missions = []
        for (var x = 0; x < res.data.length; x++) {
            if (games.length == 0) {
                games.push(res.data[x].game);
            } else if (!games.includes(res.data[x].game)) {
                games.push(res.data[x].game);
                missions_first.push(res.data[x]);
            } else {
                missions.push(res.data[x]);
            }
        }
        for (var x = 0; x < missions.length; x++) {
            missions_first.push(missions[x]);
        }
        setGameOption(games);
        setArcadeMissions(missions_first);
    }

    async function getAccountBalances() {
        const res = await request.get('http://api.private.arcade2earn.io/api/demo/wallet/RCade47ZKErNcQB1CgkpEZUEmyfsqi2qh21mSCWASgm')
        setArcadeTokenAccounts(res.data)
    }

    async function getRewardBalances() {
        const res = await request.get('http://api.private.arcade2earn.io/api/demo/rewards/RCade47ZKErNcQB1CgkpEZUEmyfsqi2qh21mSCWASgm')
        setArcadeRewards(res.data)
    }

    const asdf = useEffect(async () => {
        //console.log('startTokenAccountGet');
        await getMissionPool();
        await getAccountBalances();
        await getRewardBalances();
        //   setTokenAccounts(await listOwnedTokenAccounts());
        //console.log('Tokenaccounts: ', tokenAccounts);
        return 0;
    }, []);

    const getMissions = useEffect(async () => {
        setFilterMission(ArcadeMissions.filter(val => (gameOption[0] === "ALL" || val.game == gameOption[0])));
    }, [ArcadeMissions])

    return (
        <div className='d-flex flex-column'>
            <div className='order-2'>
                <Page title={t('pages.mission_pools.html_page_title')} >



                    <div className='d-flex flex-column'>
                        <div className='dropdown order-0 align-self-end' style={{ marginRight: "2rem" }}>
                            Game: <button className='btn  dropdown-toggle text-white fw-bold' style={{ backgroundColor: "#53095d" }} type='button' data-bs-toggle='dropdown' area-aria-expanded='false'>
                                {selectedGame}
                            </button>
                            <ul className='dropdown-menu rounded' style={{ backgroundColor: "#2c2d30" }}>
                                {gameOption.map((item, index) => {
                                    return (

                                        <li style={{ marginRight: '1.1rem', marginLeft: "1.1rem" }} key={index}>
                                            <span className='dropdown-item text-white rounded text-center' onClick={() => { setFilterMission(ArcadeMissions.filter(val => val.game == item)); setSelectedGame(item); console.log(item); }}
                                                onMouseEnter={mouseEnterEvents} onMouseLeave={mouseLeaveEvents}>
                                                {item}
                                            </span>
                                        </li>
                                    )
                                })}


                            </ul>


                        </div>
                        <div className="row order-1">
                            <div className="col-12">
                                {/* <Carousel> */}
                                <div className="container">
                                    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3">
                                        {
                                            filteredMissions.map((item, i) => {
                                                return (
                                                    <div className="col">
                                                        <MissionItem key={i} data={item} actionButton={true} onAction={() => { setModalState({ isOpen: true }); setMissionState(item) }}
                                                            t={t} />
                                                    </div>

                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            </div>
                            {/* </Carousel> */}
                        </div>

                    </div>
                    <DemoBalanceContext.Provider
                        value={{ ArcadeRewards, ArcadeTokenAccounts, setArcadeRewards, setArcadeTokenAccounts, getAccountBalances }}
                    >
                        <MissionItemModal
                            data={MissionState} account={{ arcade: ArcadeTokenAccounts.arcade, xarcade: ArcadeTokenAccounts.xarcade, rewards: ArcadeRewards }}
                            isOpen={modalState.isOpen}
                            closeModal={() => setModalState({ isOpen: false })} />
                    </DemoBalanceContext.Provider>
                </Page>
            </div>



        </div>
    );
}

const mouseEnterEvents = (e) => {
    e.target.style.cursor = "pointer";
    e.target.style.backgroundColor = 'black'
}
const mouseLeaveEvents = (e) => {
    e.target.style.cursor = "pointer";
    e.target.style.backgroundColor = 'transparent'
}

export default withTranslation()(MissionPools);