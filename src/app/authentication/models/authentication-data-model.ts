import { BaseModelDefault } from 'src/app/shared/models/base-model';
import { TokenDataModel } from './token-data-model';

export interface AuthenticationData extends BaseModelDefault {
    userName: string;
    displayName: string;
    about: string;
    tokenData: TokenDataModel;
}
