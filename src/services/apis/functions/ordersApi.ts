import client from "../client";

export const getOrders=(id:number)=>{
    const token = localStorage.getItem("token")
    ? localStorage.getItem("token")
    : "";
    return client.get('/orders/'+id,{
        headers: {'Authorization': 'Bearer ' + token}
      });
}

export const getCarts = (id:string)=>{
    const token = localStorage.getItem("token")
    ? localStorage.getItem("token")
    : "";
    return client.get('/carts/'+id,{
        headers: {'Authorization': 'Bearer ' + token}
      });
}

export const postCarts = (id:string, obj:any)=>{
    const token = localStorage.getItem("token")
    ? localStorage.getItem("token")
    : "";
    return client.post('/carts/'+id,obj,{
        headers: {'Authorization': 'Bearer ' + token}
      });
}

export const deleteCarts = (id:string, idOrder :string) =>{
    const token = localStorage.getItem("token")
    ? localStorage.getItem("token")
    : "";
    return client.delete(`/carts/${id}/${idOrder}`,{
        headers: {'Authorization': 'Bearer ' + token}
      });

}