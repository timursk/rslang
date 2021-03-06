import { Reducer } from 'react';
import {
  InitialSprintState,
  SprintReducerAction,
  SprintActionTypes,
} from '../../types/sprintTypes';
import { POINTS } from '../../utils/Constants';
import { initialSprintState } from '../contexts/sprintContext';

const sprintReducer: Reducer<InitialSprintState, SprintReducerAction> = (state, action) => {
  switch (action.type) {
    case SprintActionTypes.LOADING: {
      return {
        ...state,
        isLoading: true,
      };
    }

    case SprintActionTypes.PRELOAD: {
      return {
        ...state,
        level: action.payload.level,
        questions: action.payload.randomData,
        isLoading: false,
        isGameReady: true,
        isTimerActive: true,
      };
    }

    case SprintActionTypes.SET_RECORD: {
      return {
        ...state,
        score: state.score + action.payload,
      };
    }

    case SprintActionTypes.CHANGE_LEVEL: {
      const { level, result } = action.payload;
      return {
        ...state,
        level: level,
        questions: result,
        isLoading: false,
        isGameReady: true,
        isTimerActive: true,
      };
    }

    case SprintActionTypes.CORRECT_ANSWER: {
      const answers = [...state.answers, action.payload];

      const correctAnswersCount = state.correctAnswersCount + 1;
      const currentQuestionIndex = state.currentQuestionIndex + 1;
      const maxAnswersCount =
        correctAnswersCount > state.maxAnswersCount ? correctAnswersCount : state.maxAnswersCount;

      const pointsId =
        correctAnswersCount >= POINTS.length ? POINTS.length - 1 : correctAnswersCount - 1;
      const score = state.score + POINTS[pointsId];

      const isGameFinished = state.questions.length <= currentQuestionIndex;

      return {
        ...state,
        answers,
        score,
        correctAnswersCount,
        currentQuestionIndex,
        isGameFinished,
        maxAnswersCount,
        allCorrectCount: state.allCorrectCount + 1,
      };
    }

    case SprintActionTypes.INCORRECT_ANSWER: {
      const answers = [...state.answers, action.payload];
      const correctAnswersCount = 0;
      const currentQuestionIndex = state.currentQuestionIndex + 1;
      const isGameFinished = state.questions.length <= currentQuestionIndex;

      return {
        ...state,
        answers,
        correctAnswersCount,
        currentQuestionIndex,
        isGameFinished,
        allIncorrectCount: state.allIncorrectCount + 1,
      };
    }

    case SprintActionTypes.ADD_NEW: {
      const newArr = [...state.newWords, action.payload];
      return {
        ...state,
        newWords: newArr,
      };
    }

    case SprintActionTypes.SET_SCORE: {
      type Counter =
        | {
            failCounter: number;
            successCounter: number;
          }
        | undefined
        | null;
      const counters: Counter[] = action.payload;
      const answers = [...state.answers];

      counters.forEach((counter, id) => {
        if (!counter) {
          return;
        }

        answers[id].failCounter = counter.failCounter;
        answers[id].successCounter = counter.successCounter;
      });

      return {
        ...state,
        answers,
        isLoading: false,
      };
    }

    case SprintActionTypes.TIME_TICK: {
      const seconds = state.seconds - 1;

      return {
        ...state,
        seconds,
      };
    }

    case SprintActionTypes.FINISH_GAME: {
      return {
        ...state,
        isGameFinished: true,
      };
    }

    case SprintActionTypes.RESTART: {
      return {
        ...initialSprintState,
      };
    }

    default:
      return state;
  }
};

export default sprintReducer;
