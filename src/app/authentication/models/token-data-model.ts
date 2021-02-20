import { BaseModelDefault } from 'src/app/shared/models/base-model';

export interface TokenDataModel extends BaseModelDefault{
    accessToken: string;
    accessTokenExpiryTime: Date;
    refreshToken: string;
    refreshTokenExpiryTime: Date;
}
