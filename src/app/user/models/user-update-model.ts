import { BaseModelDefault } from 'src/app/shared/models/base-model';

export interface UserUpdateModel extends BaseModelDefault {
    displayName: string;
    about: string;
}
