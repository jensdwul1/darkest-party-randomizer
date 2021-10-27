import React from 'react';

import torchActive from './assets/torch-active.svg';
import torchInactive from './assets/torch-inactive.svg';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import styles from './Torch.module.scss';
import { selectTorch, setStatus, TorchDurations, TorchStatus } from './torchSlice';

const Torch = () => {
  const torch = useAppSelector(selectTorch);
  const dispatch = useAppDispatch();
  let action: any;
  const clearAction = () => {
    if(action){
      clearTimeout(action);
    }
  }
  const setAction = (status: TorchStatus, duration: number) => {
    action = setTimeout(() => { 
      torchRemainsUntouched(status)
    }, duration);
  }
  const torchWasTouched = () => {  
    dispatch(setStatus(TorchStatus.Flaring));
    setAction(TorchStatus.Flaring,TorchDurations.flaring);
  }
  const torchRemainsUntouched = (torchStatus: TorchStatus) => {
    switch(torchStatus){
        case TorchStatus.Dimming: {
          clearAction();
          dispatch(setStatus(TorchStatus.Doused));
          break;
        }
        case TorchStatus.Burning: {
          clearAction();
          dispatch(setStatus(TorchStatus.Dimming));
          setAction(TorchStatus.Dimming,TorchDurations.dimming);
          break;
        }
        case TorchStatus.Flaring: {
          clearAction();
          dispatch(setStatus(TorchStatus.Burning));
          setAction(TorchStatus.Burning,TorchDurations.burning)
          break;
        }
        default: {
          clearAction();
          dispatch(setStatus(TorchStatus.Doused));
          break;
        }
    }
  }
  let flame;
  if(torch !== TorchStatus.Doused){
    flame = (
    <div className={styles.FireGroup}>
      <div className={styles.Light}></div>
      <div className={styles.Fire}>
        <div className={styles.FireBack}></div>
        <div className={styles.FireMedium}></div>
        <div className={styles.FireFront}></div>
      </div>
    </div>
   );
  } else {
    flame = '';
  }
  return (
    <div className={`${styles.Torch} ${styles['state-'+torch]}`} onClick={() => {torchWasTouched()}} role="button">
       {flame}
       <img src={torchInactive} className={styles.TorchImage} alt="The Torch" />
       <div>Torch :: {torch}</div>
    </div>
  );
}

export default Torch;
