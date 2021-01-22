import { BaseModelDefault } from "src/app/shared/models/base-model";

export interface UserListModel extends BaseModelDefault {
    userName: string;
    isAdmin: boolean;
    displayName: string;
}
