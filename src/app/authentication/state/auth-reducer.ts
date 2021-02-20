import { AuthenticationDataModel } from '../models/authentication-data-model';
import { TokenDataModel } from '../models/token-data-model';
import * as AuthActions from './auth-actions';

export type Action = AuthActions.ALL;

// Default state
const defaultState: AuthenticationDataModel = {
    about: '',
    displayName: '',
    id: '',
    tokenData: {
        accessToken: '',
        accessTokenExpiryTime: new Date(Date.now()),
        id: '',
        refreshToken: '',
        refreshTokenExpiryTime: new Date(Date.now())
    },
    userName: ''
};

// Helper method to create new state
const newState = (state: AuthenticationDataModel, newData: AuthenticationDataModel) => {
    return Object.assign({}, state, newData);
};

// tslint:disable-next-line: typedef
export function AuthReducer(state = defaultState, action: Action ) {
    console.log(action.type, state);

    switch (action.type) {
        case AuthActions.SET_AUTH_DATA:
            return newState(state, action.payload);
        case AuthActions.CLEAR_AUTH_DATA:
            return newState(state, defaultState);
        case AuthActions.GET_AUTH_DATA:
            return state;
        default:
            return state;
    }
}
