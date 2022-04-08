import React, {useEffect} from 'react';
import { Page, Carousel, MissionItem, MissionItemModal } from '../../components'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'

import DataTable, { createTheme } from 'react-data-table-component';

const request = require('axios');
const WidgetBottomComponent = (props) => {
    return(
        <div className="home-widget-bottom pt-3">
            <a href='#' className='btn btn-action px-4'>
                <FontAwesomeIcon icon={faInfoCircle}/>
                <span>Details</span>
            </a>
        </div>
    );
}

const random_data = (textArray) => {
    const index = Math.floor(Math.random()*textArray.length);
   
    return textArray[index];
}

const ExpandedComponent = ({ data }) => {
    return (
        <div className="card card-solid">
            <div className="card-body">
                <div className="row">
                    <div className="col-12 col-sm-6">
                        <h3 className="d-inline-block d-sm-none">{data.name}</h3>
                        <div className="col-12">
                            <img src={data.ship.image} className="product-image" alt="Product" />
                        </div>

                    </div>
                    <div className="col-12 col-sm-6">
                        <h3 className="my-3">{data.name}</h3>
                        <p>{data.ship.description}</p>
                    </div>
                </div>

            </div>
        </div>);
};
createTheme('solarized', {
    background: {
        default: 'transparent',
    },
}, 'dark');

const Warchest = (props) => {
    

    const [nfts, setNFT] = React.useState([]);

    React.useEffect(() => {
        request.get("http://arcade.api.private.aioxperts.com/api/fleet/stats").then((response) => {
            const myShips = [];
            response.data.ships.forEach((x) => {
                if (x.enlisted) {
                    myShips.push(x);
                }
            })
            setNFT(myShips);
        })
    }, [])

    if (!nfts) return null;

    return(
        <Page title="Warchest">
            <div className="row">
                <div className="col-12 col-sm-4 col-lg-4">
                    <div className="card shadow-widget h-100">
                        <div className="card-body">
                            <div className="card-header-title">
                                <h3 className="card-title text-center text-gradient">Wallet</h3>
                            </div>
                            <div className="card-text"> 
                                {nfts.length} Ships
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-sm-4 col-lg-4">
                    <div className="card shadow-widget h-100">
                        <div className="card-body">
                            <div className="card-header-title">
                                <h3 className="card-title text-center text-gradient">Total xArcade Pooled</h3>
                            </div>
                            <div className="card-text"> 
                                5000 xArcade
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-sm-4 col-lg-4">
                    <div className="card shadow-widget h-100">
                        <div className="card-body">
                            <div className="card-header-title">
                                <h3 className="card-title text-center text-gradient">Total Rewards Earned</h3>
                            </div>
                            <div className="card-text"> 
                                199900 xArcade
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <section className="hero-page-title-section">
            </section>
            
            <div className="row">
                <div className="col-12">
                    <div className="card shadow-widget">
                        <div className="card-body">
                        <div className="card-header-title">
                                <h3 className="card-title text-center text-gradient">Star Atlas NFTs</h3>
                            </div>
                            <DataTable
                                theme="solarized"
                                columns={[
                                    {
                                        name: "Name",
                                        selector: row => row.name,
                                        sortable: true
                                    },
                                    {
                                        name: "Mint",
                                        selector: row => "".concat(row.mint.substring(0, 4), "......", row.mint.substring(39, row.mint.length))
                                    },
                                    {
                                        name: "Total Earned",
                                        selector: row => "".concat(row.total_earned.toFixed(4), " ATLAS"),
                                        sortable: true
                                    },
                                    {
                                        name: "Owned",
                                        selector: row => row.count
                                    },
                                    {
                                        name: "Enlisted",
                                        selector: row => row.enlisted,
                                        wrap: true
                                    }
                                ]}
                                data={nfts}
                                expandableRows={1}
                                pagination={1}
                                responsive={1}
                                striped={1}
                                expandableRowsComponent={ExpandedComponent}
                                expandOnRowClicked={1}
                                expandOnRowDoubleClicked={1}
                                expandableRowsHideExpander={1}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </Page>
    );
}

export default Warchest;