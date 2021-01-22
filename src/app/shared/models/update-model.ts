import { IDType } from '../types/id-type';
import { BaseModel } from './base-model';

export interface UpdateModelDefault extends UpdateModel<string>{
}

export interface UpdateModel<T extends IDType> extends BaseModel<T>{
}
