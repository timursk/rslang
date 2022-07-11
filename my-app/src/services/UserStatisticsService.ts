import { API_URL, ENDPOINTS } from '../utils/Constants';
import { getNewWords } from './UserAggregatedWordsService';

interface UserStatisticsOptional {
  audiocall?: string;
  sprint?: string;
  allNew?: string;
}

interface UserStatistics {
  learnedWords: number;
  optional: UserStatisticsOptional;
}

export const getUserStatistics = async () => {
  const userJSON = localStorage.getItem('CurrentUser');
  if (!userJSON) {
    return 'no info';
  }
  const { userId, token } = JSON.parse(userJSON);

  const rawResponse = await fetch(`${API_URL}${ENDPOINTS.USERS}/${userId}${ENDPOINTS.STATISTICS}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    },
  });

  if (rawResponse.ok) {
    return rawResponse.json();
  }

  throw new Error('Something went wrong with statistics');
};

export const createUserStatistics = async (statistics: UserStatistics) => {
  const userJSON = localStorage.getItem('CurrentUser');
  if (!userJSON) {
    return 'no info';
  }
  const { userId, token } = JSON.parse(userJSON);

  const prom = await getNewWords();
  const newWordsCount = prom[0].totalCount[0].count;
  const options = {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(statistics),
  };

  const oldStat = await getUserStatistics();
  console.log('old', oldStat);
  console.log('new', statistics);
  if (oldStat) {
    const newStat = {
      learnedWords: newWordsCount,
      optional: {
        audiocall: [
          ...(oldStat.optional.audiocall ? oldStat.optional.audiocall : ''),
          statistics.optional.audiocall,
        ],
        sprint: [
          ...(oldStat.optional.sprint ? oldStat.optional.sprint : ''),
          statistics.optional.sprint,
        ],
        allNew: [
          ...(oldStat.optional.allNew ? oldStat.optional.allNew : ''),
          statistics.optional.allNew,
        ],
      },
    };
    options.body = JSON.stringify(newStat);
  }

  const rawResponse = await fetch(
    `${API_URL}${ENDPOINTS.USERS}/${userId}${ENDPOINTS.STATISTICS}`,
    options
  );
  // const content = await rawResponse.json();
  // console.log('STAT is  ', content);
};

type UpdateUserStatistics = {
  learnedWords?: number;
  options?: any;
};
let body: any;

export const updateUserStatistics = async ({ learnedWords, options }: UpdateUserStatistics) => {
  const userJSON = localStorage.getItem('CurrentUser');
  if (!userJSON) {
    return 'no info';
  }
  const { userId, token } = JSON.parse(userJSON);

  try {
    const currentStatistics = await getUserStatistics();
    const currentOptions = await JSON.parse(currentStatistics?.optional?.data || '[]');

    let isNewDate = false;
    const key = Object.keys(options)[0];
    console.log('CURRENT OPTIONS: ', currentOptions);
    currentOptions.forEach((item: any) => {
      if (item[key]) {
        isNewDate = true;
        item[key] += options[key];
      }
    });

    if (!isNewDate) {
      currentOptions.push(options);
    }

    body = {
      learnedWords,
      optional: {
        data: JSON.stringify(currentOptions),
      },
    };
  } catch (e) {
    body = {
      learnedWords,
      optional: {
        data: JSON.stringify([]),
      },
    };
  }

  const rawResponse = await fetch(`${API_URL}${ENDPOINTS.USERS}/${userId}${ENDPOINTS.STATISTICS}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (rawResponse.ok) {
    return rawResponse.json();
  }

  throw new Error('Something went wrong with statistics');
};
