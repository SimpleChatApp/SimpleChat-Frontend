import { Action, createReducer, on } from '@ngrx/store';
import { Guid } from 'src/app/shared/helpers/guid';
import * as AppStore from 'src/app/state/app-state';
import { AuthenticationDataModel } from '../models/authentication-data-model';
import { TokenDataModel } from '../models/token-data-model';
import * as AuthActions from './auth-actions';

export interface AuthState {
    CurrentUserId: string;
    Data: AuthenticationDataModel;
    IsAuthenticated: boolean;
}

// Default state
const defaultState: AuthState = {
    CurrentUserId: Guid.emptyGuid,
    Data: {} as AuthenticationDataModel,
    IsAuthenticated: false
};

const AuthReducer = createReducer<any>(
    defaultState,
    on(AuthActions.SetAuthData, (state: AuthState, { payload }) => {
        return {
            ...state,
            Data: payload,
            CurrentUserId: payload.id,
            IsAuthenticated: true
        };
    }),
    on(AuthActions.GetAuthData, state => state.Data),
    on(AuthActions.ClearAuthData, state => defaultState)
);

// tslint:disable-next-line: typedef
export function Reducer(state: AuthState | undefined, action: Action) {
    return AuthReducer(state, action);
}
