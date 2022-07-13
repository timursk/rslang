import { useEffect, useState } from 'react';
import { getPartOfTextbook } from '../services/WordService';
import { Question } from '../types/sprintTypes';
import Utils from '../utils/Utils';

type Props = {
  level: number | null;
  part: string | number | null;
  page: number | null;
};

export const useGetSprintWords = ({ level, part, page }: Props) => {
  const [response, setResponse] = useState<Question[]>([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (level === null && part === null) {
      setResponse([]);
      setIsLoading(true);
      return;
    }

    const fetchData = async () => {
      try {
        if (level || level === 0) {
          const data = [
            await getPartOfTextbook(`${Utils.random(0, 29)}`, `${level}`),
            await getPartOfTextbook(`${Utils.random(0, 29)}`, `${level}`),
            await getPartOfTextbook(`${Utils.random(0, 29)}`, `${level}`),
          ];

          const result = Utils.getRandomWords(data);
          setResponse(result);
        }
      } catch (err) {
        const { message } = err as Error;
        setError(message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [level, page, part]);

  return { response, error, isLoading };
};
