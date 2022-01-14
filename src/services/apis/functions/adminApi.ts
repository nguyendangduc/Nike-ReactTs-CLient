import client from "../client";

export function getUsers(): Promise<any> {
  return client.get("/users");
}

export function getAllProducts(): Promise<any> {
  return client.get("/products");
}

export function postProduct(productInfo: Product): Promise<any> {
  const token = localStorage.getItem("token")
    ? localStorage.getItem("token")
    : "";
  return client.post(`/products`, productInfo, {
    headers: { Authorization: "Bearer " + token },
  });
}

export function updateProduct(id: any, bodyProductUpdate: any) {
  const token = localStorage.getItem("token")
    ? localStorage.getItem("token")
    : "";
  return client.put(`/products/${id}`, bodyProductUpdate, {
    headers: { Authorization: "Bearer " + token },
  });
}

export function deleteProduct(id: any): Promise<any> {
  const token = localStorage.getItem("token")
    ? localStorage.getItem("token")
    : "";
  return client.delete(`/products/${id}`, {
    headers: { Authorization: "Bearer " + token },
  });
}
