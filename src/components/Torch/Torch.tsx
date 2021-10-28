import React from 'react';

import { ReactComponent as TorchActive } from './assets/torch-active.svg';
import { ReactComponent as TorchInactive } from './assets/torch-inactive.svg';
import { ReactComponent as SvgDefs } from './assets/svg-definitions.svg';

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
  let torchIcon;
  if(torch === TorchStatus.Doused){
    torchIcon = <TorchInactive className={styles.TorchImage} title="The Torch"  />
  } else {
    torchIcon = <TorchActive className={`${styles.TorchImage} ${styles['state-'+torch]}`} title="The Torch"  />
  }
  return (
    <div className={`${styles.Torch} ${styles['state-'+torch]}`} onClick={() => {torchWasTouched()}} role="button">
        <SvgDefs className="hidden"/>
       {torchIcon}
    </div>
  );
}

export default Torch;
