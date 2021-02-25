import { AuthState } from '../authentication/state/auth-reducer';

export interface State {
    auth: AuthState; // reducer icinde veya disinda interdace tanimla ayrica
}

export const AuthKey = 'auth';
