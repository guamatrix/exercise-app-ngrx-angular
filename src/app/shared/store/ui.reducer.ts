import { Action } from '@ngrx/store';

import * as Actions from './ui.actions';

export interface State {
  isLoading: boolean;
}

const initialState: State = {
  isLoading: false
};

export function uiReducer(state = initialState, action: Actions.UIActions) {
  switch (action.type) {
    case Actions.START_LOADING:
      return {
        isLoading: true
      };

    case Actions.STOP_LOADING:
      return {
        isLoading: false
      };
    default:
      return state;
  }
}

export const getIsLoading = (state: State ) => state.isLoading;
