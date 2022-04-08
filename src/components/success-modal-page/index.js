import React, { useEffect, useState } from 'react';

import styles from './styles.scss';

const SuccessAlert = (props) => {
    const [isFocus, setIsFocused] = useState(false);
    useEffect(() => {

    },[]);
    useEffect(() => {
        setTimeout(() => {
            setIsFocused(props.isActive);
        }, 700);
    },[props.isActive]);
    console.log('props on success', props)
    return(
        <div className='row mt-5'>
            <div className='col-12'>
                <div className="success-checkmark">
                    <div className={isFocus && "check-icon"}>
                        <span className="icon-line line-tip"></span>
                        <span className="icon-line line-long"></span>
                        <div className="icon-circle"></div>
                        <div className="icon-fix"></div>
                    </div>
                </div>

                <div className='text-center'>
                    <h5 className='success-title'>Success</h5>
                    <p><strong>{props.amount}</strong> xArcade was successfully {props.type}</p>
                    <p className='font-12'>Transaction : 0x8497c1ebb18cc3cb677989b25e553585db11ed3652d08f8265a24cc2513ff020</p>

                    <button type='button' className='btn btn-action px-5 mt-5' onClick={props.closeModal}>Close</button>
                </div>
            </div>
        </div>
    );
}

SuccessAlert.defaultProps = {
    type : null,
    amount: 0
}

export default SuccessAlert;