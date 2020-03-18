export interface IStack {
    totalAmount:number;
    totalCalories:number;
    totalPrice:number;
    _createdAt:number;
    isEqual:(stack:any)=> boolean;
}