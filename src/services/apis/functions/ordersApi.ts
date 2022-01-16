import client from "../client";

export const getOrdersByKey=(id:number, searchKey: string)=>{
    const token = localStorage.getItem("token")
    ? localStorage.getItem("token")
    : "";
    return client.get('/orders/'+id+'/search/'+searchKey,{
        headers: {'Authorization': 'Bearer ' + token}
      });
}

export const getOrders=(id:number)=>{
  const token = localStorage.getItem("token")
  ? localStorage.getItem("token")
  : "";
  return client.get('/orders/'+id,{
      headers: {'Authorization': 'Bearer ' + token}
    });
}

export const checkOut=(id:number, obj:ICheckout) => {
  const token = localStorage.getItem("token")
    ? localStorage.getItem("token")
    : "";
  return client.post("/carts/checkout/" + id, obj, {
    headers: { Authorization: "Bearer " + token },
  });
};
