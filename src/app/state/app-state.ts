import { AuthenticationDataModel } from '../authentication/models/authentication-data-model';

export interface State {
    auth: AuthenticationDataModel; // reducer icinde veya disinda interdace tanimla ayrica
}

export const AuthKey = 'auth';
