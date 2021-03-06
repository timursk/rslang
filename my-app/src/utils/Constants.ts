import imgHappy from '../assets/illustrations/manHappy.png';
import imgIdea from '../assets/illustrations/manIdea.png';
import imgLaptop from '../assets/illustrations/manLaptop.png';
import imgHurry from '../assets/illustrations/womanHurry.png';
import imgPuzzle from '../assets/illustrations/womanPuzzle.png';
import imgTablet from '../assets/illustrations/womanTablet.png';
import { CardColors } from '../types/types';

export const APP_ROUTES = {
  MAIN: '/',
  SIGNIN: '/signIn',
  REGFORM: '/registration',
  TEXTBOOK: '/textbook',
  SPRINT: '/sprint',
  STATISTICS: '/statistics',
  AUDIOCALL: '/audiocall',
  HARDWORDS: '/hardwords',
  PART1: '/part1',
  PART2: '/part2',
  PART3: '/part3',
  PART4: '/part4',
  PART5: '/part5',
  PART6: '/part6',
};

export const API_URL = 'https://app-rs-lang-2022.herokuapp.com';

export const ENDPOINTS = {
  WORDS: '/words',
  USERS: '/users',
  PAGE: 'page=',
  GROUP: 'group=',
  SIGNIN: '/signin',
  TOKENS: '/tokens',
  STATISTICS: '/statistics',
};

export enum GAME_TYPE {
  AUDIOCALL,
  SPRINT,
}

export enum WORD_STATUS {
  NEW = 'new',
  HARD = 'hard',
  LEARNED = 'learned',
}

export const DRAWER_LINKS = [
  {
    id: 1,
    link: APP_ROUTES.MAIN,
    name: 'Главная',
    collapse: null,
  },
  {
    id: 2,
    link: '',
    name: 'Учебник',
    collapse: [
      { id: 21, link: `${APP_ROUTES.TEXTBOOK}/0/1`, name: 'Elementary (A1)', collapse: null },
      { id: 22, link: `${APP_ROUTES.TEXTBOOK}/1/1`, name: 'Pre Intermediate (A2)', collapse: null },
      { id: 23, link: `${APP_ROUTES.TEXTBOOK}/2/1`, name: 'Intermediate (B1)', collapse: null },
      {
        id: 24,
        link: `${APP_ROUTES.TEXTBOOK}/3/1`,
        name: 'Upper Intermediate (B2)',
        collapse: null,
      },
      { id: 25, link: `${APP_ROUTES.TEXTBOOK}/4/1`, name: 'Advanced (C1)', collapse: null },
      { id: 26, link: `${APP_ROUTES.TEXTBOOK}/5/1`, name: 'Proficient (C2)', collapse: null },
      { id: 27, link: `${APP_ROUTES.TEXTBOOK}/hardwords/1`, name: 'Сложные слова', collapse: null },
    ],
  },
  {
    id: 3,
    link: APP_ROUTES.SPRINT,
    name: 'Спринт',
    collapse: null,
  },
  {
    id: 4,
    link: APP_ROUTES.AUDIOCALL,
    name: 'Аудиовызов',
    collapse: null,
  },
  {
    id: 5,
    link: APP_ROUTES.STATISTICS,
    name: 'Статистика',
    collapse: null,
  },
];

export const LEVEL_CARDS = [
  {
    level: 1,
    name: 'Elementary',
    img: imgHappy,
  },
  {
    level: 2,
    name: 'Pre Intermediate',
    img: imgTablet,
  },
  {
    level: 3,
    name: 'Intermediate',
    img: imgPuzzle,
  },
  {
    level: 4,
    name: 'Upper Intermediate',
    img: imgLaptop,
  },
  {
    level: 5,
    name: 'Advanced',
    img: imgHurry,
  },
  {
    level: 6,
    name: 'Proficient',
    img: imgIdea,
  },
];

export const POINTS = [10, 20, 40, 80];

export const CARD_COLORS: CardColors = {
  [WORD_STATUS.HARD]: '#d32f2f',
  [WORD_STATUS.LEARNED]: '#2e7d32',
};
