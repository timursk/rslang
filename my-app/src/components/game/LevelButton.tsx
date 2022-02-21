import { useContext, useEffect, useState } from 'react';
import { getPartOfTextbook } from '../../services/WordService';
import Utils from '../../utils/Utils';
import { QuizContext } from '../sprint/Sprint';

interface LevelButtonProps {
  item: number;
}

const LevelButton = ({item}: LevelButtonProps) => {
  const [quizState, dispatch] = useContext(QuizContext);
  const [level, setLevel] = useState<number>();

  useEffect(() => {
    if (level || level === 0) {
      const fetchData = async() => {
        dispatch({ type: 'LOADING' })
        try {
          const data = [await getPartOfTextbook('0', `${level}`), await getPartOfTextbook('2', `${level}`), await getPartOfTextbook('1', `${level}`)];
          const result = Utils.getRandomWords(data);
          dispatch({ type: 'CHANGE_LEVEL', payload: {result, level} });
        } catch(err) {
          alert('Oops! Something goes wrong.')
        }
      }

      fetchData();
    }
  }, [level]);

  return (
    <div style={{ cursor: 'pointer', background: '#1976d2', width: '50px', height: '50px',
        borderRadius: '5px', display: 'flex', justifyContent: 'space-around', alignItems: 'center'}} onClick={() => {
      setLevel(item - 1);
    }}>{item}</div>
  )
}

export default LevelButton