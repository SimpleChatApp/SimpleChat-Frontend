import { APIErrorCodeModel } from './api-error-code-model';
import { BaseModel } from './base-model';

export interface APIResultModel<T>{
        recId: T;
        rec: BaseModel<T>;
        isSuccessful: boolean;
        errors: APIErrorCodeModel[];
}
