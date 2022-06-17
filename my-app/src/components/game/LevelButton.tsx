import { Fab } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { getPartOfTextbook } from '../../services/WordService';
import Utils from '../../utils/Utils';
import { QuizContext } from '../sprint/Sprint';

interface LevelButtonProps {
  item: number;
}

const LevelButton = ({ item }: LevelButtonProps) => {
  const [quizState, dispatch] = useContext(QuizContext);
  const [level, setLevel] = useState<number>();

  useEffect(() => {
    if (level || level === 0) {
      const fetchData = async () => {
        dispatch({ type: 'LOADING' });
        try {
          const data = [
            await getPartOfTextbook(`${Utils.random(0, 29)}`, `${level}`),
            await getPartOfTextbook(`${Utils.random(0, 29)}`, `${level}`),
            await getPartOfTextbook(`${Utils.random(0, 29)}`, `${level}`),
          ];
          const result = Utils.getRandomWords(data);
          dispatch({ type: 'CHANGE_LEVEL', payload: { result, level } });
        } catch (err) {
          alert('Oops! Something goes wrong.');
        }
      };

      fetchData();
    }
  }, [level]);

  return (
    <Fab
      color="primary"
      style={{ width: '60px', height: '60px' }}
      onClick={() => {
        setLevel(item - 1);
      }}
    >
      {item}
    </Fab>
  );
};

export default LevelButton;
