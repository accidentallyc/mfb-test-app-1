export interface IStack {
    id:string;
    totalAmount:number;
    totalCalories:number;
    totalPrice:number;
    isDeleted: 0|1;
    isPersisted: 0|1;
    _createdAt:number;
}