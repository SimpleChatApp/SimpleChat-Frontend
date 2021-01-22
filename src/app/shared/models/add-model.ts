import { IDType } from '../types/id-type';
import { BaseModel } from './base-model';

export interface AddModelDefault extends AddModel<string>{
}

export interface AddModel<T extends IDType> extends BaseModel<T>{
}
