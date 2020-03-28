export interface URL extends String {

}

export interface Guid extends String{

}

export interface IMap<T> {
    [index: string]: T;
}
