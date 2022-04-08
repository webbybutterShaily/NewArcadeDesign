import React, { useEffect, useState } from 'react';
import ReactModal from 'react-modal';
import styles from './styles.scss';

import StepWizard from "react-step-wizard";
import MissionDetail from '../mission-detail';
import StackForm from '../stack-form';
import SuccessAlert from '../success-modal-page';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'


const MissionItemModal = (props) => {
    
    const [handleFunc, setHandler] = useState((e) => {});
    const [alertState, setAlertState] = useState({
        type:null,
        amount: 0
    });

    useEffect(() => {
        setHandler((eventName) => {
            console.log("EventName", eventName);
        })
        setAlertState({
            type:null
        })
    },[]);

    return (
        <ReactModal 
            isOpen={props.isOpen}
            onAfterOpen={() => setHandler("afterOpen")}
            shouldCloseOnEsc={true}
            shouldCloseOnOverlayClick={true}
           onRequestClose={() => props.closeModal()}
        >
            <a  className='modal-close' onClick={() => props.closeModal()}>
                <FontAwesomeIcon icon={faTimes}/>
            </a>
            <StepWizard>
                <MissionDetail data={props.data} />
                <StackForm data={props.data} account={props.account} updateState={(state) => { setAlertState({...alertState, ...state}); 
                    }}/>
                <SuccessAlert amount={alertState.amount} type={alertState.type} closeModal={props.closeModal}/>
            </StepWizard>
            
        </ReactModal>
    );
}

export default MissionItemModal;