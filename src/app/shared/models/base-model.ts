export interface BaseModel<T> {
    id: T;
}

export interface BaseModelDefault extends BaseModel<string> {
}
