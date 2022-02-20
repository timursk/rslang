import { useContext } from 'react';
import { GAME_TYPE } from '../../utils/Constants';
import { AudioContext } from './Audiocall';

interface GameResultProps {
  type: GAME_TYPE;
}

const GameResult = (props: GameResultProps) => {
  const [quizState, dispatch] = useContext(AudioContext);
  if (quizState.isGameFinished) {
    return (
      <div style={{height: '300px', overflowY: 'auto'}}>{quizState.answers.map((obj) => {
        return <p key={obj.item.id + props.type}>{`${obj.item.word} ${obj.item.wordTranslate} ${obj.answer} 
            ${obj.successCounter}/${obj.successCounter + obj.failCounter}`}</p>
      })}</div>
    );
  }
  return <></>;
}

export default GameResult