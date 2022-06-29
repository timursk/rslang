import { Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useSprintContext } from '../../../store/hooks';
import { SprintActionTypes } from '../../../types/sprintTypes';
import { GAME_TYPE } from '../../../utils/Constants';
import GameLife from '../Game/GameLife';
// import { AudioContext } from '../../../pages/audiocall/Audiocall';
// import GameLife from '../../audiocall/GameLife';
import { ScoreWrapper, StarsWrapper, StyledStar } from '../Game/styles';
import TextTimer from '../Game/TextTimer';

interface GameScoreProps {
  correctAnswersCount: number;
  isCorrect: boolean;
  type: GAME_TYPE;
  currentLifeIndex?: number;
}

const points = [10, 20, 40, 80];
const stars = ['⭐', '⭐', '⭐', '⭐'];

const GameScore = ({ correctAnswersCount, isCorrect, type, currentLifeIndex }: GameScoreProps) => {
  const [sprintContext, dispatch] = useSprintContext();

  // const [audioState] = React.useContext(AudioContext);
  const [score, setScore] = useState(0);
  console.log('CURR', currentLifeIndex);
  const correctCount = correctAnswersCount !== 0 ? correctAnswersCount - 1 : 0;
  const id = correctAnswersCount >= points.length ? points.length - 1 : correctCount;

  useEffect(() => {
    if (isCorrect) {
      const newScore = score + points[id];

      setScore(newScore);
      dispatch({ type: SprintActionTypes.SET_RECORD, payload: newScore });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, correctCount, id, isCorrect]);

  const plusScore = isCorrect ? points[id + 1] || points.at(-1) : points[0];

  return (
    <Stack sx={{ width: '100%' }}>
      <ScoreWrapper>
        <Typography>
          {score} баллов (+{plusScore})
        </Typography>

        <TextTimer quizState={sprintContext} dispatch={dispatch} />
      </ScoreWrapper>

      <StarsWrapper>
        {stars.map((item, idx) => {
          const isCorrect = correctAnswersCount > idx;

          return (
            <StyledStar key={idx} isCorrect={isCorrect}>
              {item}
            </StyledStar>
          );
        })}
      </StarsWrapper>

      {type === GAME_TYPE.AUDIOCALL ? (
        <StarsWrapper sx={{ filter: 'hue-rotate(225deg)' }}>
          <GameLife count={currentLifeIndex ?? 0} />
        </StarsWrapper>
      ) : null}
    </Stack>
  );
};

export default GameScore;
