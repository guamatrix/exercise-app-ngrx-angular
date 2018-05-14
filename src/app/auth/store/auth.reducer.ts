import * as Actions from './auth.actions';

export interface State {
  isAuthenticated: boolean;
}

const initialState = {
  isAuthenticated: false
};

export function authReducer(state = initialState, action: Actions.AuthActions) {
  switch (action.type) {
    case Actions.LOGIN:
      return {
        isAuthenticated: true
      };

    case Actions.LOGOFF:
      return {
        isAuthenticated: false
      };

    default:
      return state;
  }
}

export const getIsAuthenticated = (state: State) => state.isAuthenticated;
