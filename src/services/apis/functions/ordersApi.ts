import client from "../client";

export const getOrders=(id:number)=>{
    return client.get('/orders/'+id);
}