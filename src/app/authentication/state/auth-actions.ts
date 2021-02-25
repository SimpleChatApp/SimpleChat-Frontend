import { Action, createAction, props } from '@ngrx/store';
import { AuthenticationDataModel } from '../models/authentication-data-model';

const SET_AUTH_DATA = '[AUTH] Set Auth Data';
const CLEAR_AUTH_DATA = '[AUTH] CLEAR Auth Data';
const GET_AUTH_DATA = '[AUTH] Get Auth Data';

export const SetAuthData = createAction(SET_AUTH_DATA,
    props<{payload: AuthenticationDataModel}>());
export const ClearAuthData = createAction(CLEAR_AUTH_DATA);
export const GetAuthData = createAction(GET_AUTH_DATA);
