import React from 'react';

import MissionItem from '../mission-item';

const Gallery = (props) => {
    var images = []
    images = props.data;
    if (!images.includes(props.mainImage))
        images.push(props.mainImage);
    return images.map((x) => {
        const url = '/assets/images/' + x;
        console.log(url)
        return (
            <div className="w-15 gallery-item hover hover__slide-up">
                <img src={url} />
            </div>
        );
    })
}

const MissionDetail = (props) => {
    console.log("MissionDetail props: ", props)

    return (
        <div className="d-flex pool-modal">
            <MissionItem data={props.data} t={props.t} />
            <div className='w-100'>
                <div className="modal-title">
                    Mission Objective
                </div>
                <div className="pool-description px-4">
                    <p style={{ fontSize: "large" }}>{props.data.description}
                    </p>
                </div>
                <div className="d-flex pool-gallery">
                    <Gallery data={props.data.images} mainImage={props.data.default_image} />
                </div>
                <div className="modal-content-bottom">
                    <div className="pool-price">
                        Minimum Entry: {props.data.max_pool_size} ARCADE
                    </div>
                    <a href='#' onClick={props.nextStep} className="btn btn-action">Deposit</a>
                </div>
            </div>
        </div>
    );
}

export default MissionDetail;