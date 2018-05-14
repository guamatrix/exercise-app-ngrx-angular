import { Exercise } from '../exercise.model';
import * as fromRoot from '../../app.reducer';
import * as Actions from './training.actions';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface TrainingState {
  availableExercises: Exercise[];
  finishedExercise: Exercise[];
  runningExercise: Exercise;
}

export interface State extends fromRoot.State {
  training: TrainingState;
}

const initialState: TrainingState = {
  availableExercises: [],
  finishedExercise: [],
  runningExercise: null
};

export function trainingReducer(state = initialState, action: Actions.TrainingActions) {
  switch (action.type) {
    case Actions.GET_AVAILABLE_TRAININGS:
      return {
        ...state,
        availableExercises: action.payload
      };

    case Actions.GET_FINISHED_TRAININGS:
      return {
        ...state,
        finishedExercise: action.payload
      };

    case Actions.START_TRAINING:
      const exercise = state.availableExercises.find(ex => ex.id === action.payload);
      return {
        ...state,
        runningExercise: { ...exercise }
      };

    case Actions.STOP_TRAINING:
      return {
        ...state,
        runningExercise: null
      };

    default:
      return state;
  }
}

export const getTrainginState = createFeatureSelector<TrainingState>('training');

export const getAvailableExercises = createSelector(getTrainginState, (state: TrainingState) => state.availableExercises);
export const getFinishedExercises = createSelector(getTrainginState, (state: TrainingState) => state.finishedExercise);
export const getRunningExercise = createSelector(getTrainginState, (state: TrainingState) => state.runningExercise);
export const getIsRunningExercise = createSelector(getTrainginState, (state: TrainingState) => state.runningExercise != null);
