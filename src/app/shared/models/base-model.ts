import { IDType } from '../types/id-type';

export interface BaseModel<T extends IDType> {
    id: T;
}

export interface BaseModelDefault extends BaseModel<string> {
}
