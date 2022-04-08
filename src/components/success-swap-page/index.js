import React, { useContext } from 'react';
import { DemoBalanceContext } from '../../context/demo-accounts'
import styles from './styles.scss';

const SuccessSwap = (props) => {
    const { direction, amount} = useContext(
        DemoBalanceContext
      );
      const result = () =>{
          if(direction){
              return <p><strong>{amount}</strong>xArcade was swapped for {amount} Arcade</p>
          }else{
              return <p><strong>{amount}</strong>Arcade was swapped for {amount - (amount * .01)} xArcade</p>
          }
      }
      return(
        <div className='row mt-5'>
            <div className='col-12'>
                <div className="success-checkmark">
                    <div className={"check-icon"}>
                        <span className="icon-line line-tip"></span>
                        <span className="icon-line line-long"></span>
                        <div className="icon-circle"></div>
                        <div className="icon-fix"></div>
                    </div>
                </div>

                <div className='text-center'>
                    <h5 className='success-title'>Success</h5>
                    {result}
                    <p className='font-12'>Transaction : 0x8497c1ebb18cc3cb677989b25e553585db11ed3652d08f8265a24cc2513ff020</p>

                    <button type='button' className='btn btn-action px-5 mt-5' onClick={()=>props.previousStep()}>Close</button>
                </div>
            </div>
        </div>
    );
}

SuccessSwap.defaultProps = {
    type : null,
    amount: 0
}

export default SuccessSwap;