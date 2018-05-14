import { Action } from '@ngrx/store';


export const LOGIN = '[Auth] Loggin';
export const LOGOFF = '[Auth] Logoff';

export class Login implements Action {
  readonly type = LOGIN;
}

export class Logoff implements Action {
  readonly type = LOGOFF;
}

export type AuthActions = Login | Logoff;
