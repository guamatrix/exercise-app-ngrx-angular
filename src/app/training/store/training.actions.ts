import { Action } from '@ngrx/store';

import { Exercise } from '../exercise.model';

export const GET_AVAILABLE_TRAININGS = '[Training] Get Available Trainings';
export const GET_FINISHED_TRAININGS = '[Training] Get Finished Trainings';
export const START_TRAINING = '[Training] Start Training';
export const STOP_TRAINING = '[Training] Stop Training';

export class GetAvailableTrainings implements Action {
  readonly type = GET_AVAILABLE_TRAININGS;

  constructor(public payload: Exercise[]) {}
}

export class GetFinishedTrainings implements Action {
  readonly type = GET_FINISHED_TRAININGS;

  constructor(public payload: Exercise[]) {}
}

export class StartTraining implements Action {
  readonly type = START_TRAINING;

  constructor(public payload: string) {}
}

export class StopTraining implements Action {
  readonly type = STOP_TRAINING;
}

export type TrainingActions = GetAvailableTrainings | GetFinishedTrainings | StartTraining | StopTraining;
