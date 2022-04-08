import React, {useState,useMemo, useEffect} from 'react';
import { Page } from '../../components';

import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"

import styles from './styles.scss'


const random_data = (textArray) => {
    const index = Math.floor(Math.random()*textArray.length);
   
    return textArray[index];
}

const Rangking  = () => {

    useEffect(() => {
        $(document).ready(function () {
            $('#datatable').DataTable();
        });
    },[]);
    
    return(
        <Page title="Rankings">
            <div className="row">
                <div className="col-12">
                    <div className="card shadow-widget">
                        <div className="card-body">
                            <div className='table-responsive'>
                                <table className='table' id="datatable">
                                    <thead>
                                        <tr>
                                            <th className='text-center'>Rank</th>
                                            <th className='text-center'>Name</th>
                                            <th className='text-center'>Favourite Game</th>
                                            <th className='text-center'>Mission Pool Count</th>
                                            <th className='text-center'>Average Days</th>
                                            <th className='text-center'>Average Yield</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {Array.from({ length: 2 }).map((item,i) => {
                                            return(
                                                <tr  key={i}>
                                                <td className='text-center'>{i+1}</td>
                                                <td className='text-center'>{random_data(["Greg Fussell", "Tim Garrity"])}</td>
                                                <td className='text-center'>{random_data(["Star Atlas", "Illuvium"])}</td>
                                                <td className='text-center'>{random_data(["30", "28"])}</td>
                                                <td className='text-center'>{random_data(["12.5", "10.5"])}</td>
                                                <td className='text-center'>{random_data(["162%", "147%"])}</td>
                                            </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </Page>
    );
}

export default Rangking;