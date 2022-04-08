import React from 'react';

import MissionItem from '../mission-item';

const MissionDetail = (props) => {
    //console.log("props: ", props)
    return(
        <div className="d-flex pool-modal">
            <MissionItem data={props.data} t={props.t} />
            <div className='w-100'>
                <div className="modal-title">
                    Mission Objective
                </div>
                <div className="pool-description px-4">
                    <p>{props.data.description}
                    </p>
                </div>
                <div className="pool-gallery">
                    <div className="gallery-item">
                        <img src="https://www.arcade2earn.io/wp-content/uploads/2022/01/staratlas.png"/>
                    </div>
                    <div className="gallery-item">
                        <img src="https://www.arcade2earn.io/wp-content/uploads/2022/01/staratlas.png"/>
                    </div>
                </div>
                <div className="modal-content-bottom">
                    <div className="pool-price">
                        Minimum Entry: {props.data.max_pool_size} ARCADE
                    </div>
                    <a href='#' onClick={props.nextStep} className="btn btn-action">Stake</a>
                </div>
            </div>
        </div>
    );
}

export default MissionDetail;