import client from "../client";

export const getOrders = (id: number) => {
  const token = localStorage.getItem("token")
    ? localStorage.getItem("token")
    : "";
  return client.get("/orders/" + id, {
    headers: { Authorization: "Bearer " + token },
  });
};

export const checkOut = (id: number, obj: any) => {
  const token = localStorage.getItem("token")
    ? localStorage.getItem("token")
    : "";
  return client.post("/carts/checkout/" + id, obj, {
    headers: { Authorization: "Bearer " + token },
  });
};
