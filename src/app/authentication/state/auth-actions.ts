import { Action } from '@ngrx/store';
import { AuthenticationDataModel } from '../models/authentication-data-model';

export const SET_AUTH_DATA = '[AUTH] Set Auth Data';
export const CLEAR_AUTH_DATA = '[AUTH] CLEAR Auth Data';
export const GET_AUTH_DATA = '[AUTH] Get Auth Data';

export class SetAuthData implements Action {
    readonly type = SET_AUTH_DATA;

    constructor(public payload: AuthenticationDataModel) {}
}

export class ClearAuthData implements Action {
    readonly type = CLEAR_AUTH_DATA;
}

export class GetAuthData implements Action {
    readonly type = GET_AUTH_DATA;
}

export type ALL
    = SetAuthData
    | ClearAuthData
    | GetAuthData;
