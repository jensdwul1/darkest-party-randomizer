import React from 'react';
import styles from './CharacterPortrait.module.scss';
import { banCharacter, CharacterPortrait, CharacterPortraitType, deselectCharacter } from './characterSlice';
import { ReactComponent as Frame } from './assets/frame.svg';
import { useAppDispatch } from '../../app/hooks';

const CharacterPortrait = (props: any) => {
  const { 
    character,
    type,
    selected,
    banned
  } = props;
  const dispatch = useAppDispatch();
  const characterClick = (event: React.MouseEvent) => {
    console.log('Click Event',event);
    if(type === CharacterPortraitType.Display && character){
      dispatch(deselectCharacter(props))
    } else {
      dispatch(banCharacter(props));
    }
  }
  return (
    <div className={styles.CharacterPortrait} onClick={characterClick} role="button">
      <div className={styles.Outer}>
        <Frame className={styles.CharacterPortraitFrame} />
        <div className={styles.Inner}>
          <img src={character.icon} alt={character.name} className={`${selected?'selected':''} ${banned?'banned':''}`} />
        </div>
      </div>
    </div>
  );
}

export default CharacterPortrait;
