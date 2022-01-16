import client from "../client";

//===========Users============
export function getUsers(): Promise<any> {
  const token = localStorage.getItem("token")
    ? localStorage.getItem("token")
    : "";
  return client.get("/users", {
    headers: { Authorization: "Bearer " + token },
  });
}
export function getDetailUser(id: number): Promise<any> {
  const token = localStorage.getItem("token")
    ? localStorage.getItem("token")
    : "";
  return client.get("/users/" + id, {
    headers: { Authorization: "Bearer " + token },
  });
}
export function getUsersBySearchPage(url: string): Promise<any> {
  const token = localStorage.getItem("token")
    ? localStorage.getItem("token")
    : "";
  return client.get("/users" + url, {
    headers: { Authorization: "Bearer " + token },
  });
}

export function addUser(bodyUser: BodyCreateUser) {
  const token = localStorage.getItem("token")
    ? localStorage.getItem("token")
    : "";
  return client.post(`/users`, bodyUser, {
    headers: { Authorization: "Bearer " + token },
  });
}

export function deleteUser(id: number): Promise<any> {
  const token = localStorage.getItem("token")
    ? localStorage.getItem("token")
    : "";
  return client.delete(`/users/${id}`, {
    headers: { Authorization: "Bearer " + token },
  });
}
//===========AccountSetting============

export function putAccountSetting(id: number, body: AccountSetting) {
  const token = localStorage.getItem("token")
    ? localStorage.getItem("token")
    : "";
  return client.put(`/admin/account-setting/${id}`, body, {
    headers: { Authorization: "Bearer " + token },
  });
}

export function putRole(id: number, body: UserRole) {
  const token = localStorage.getItem("token")
    ? localStorage.getItem("token")
    : "";
  return client.put(`/admin/user-role/${id}`, body, {
    headers: { Authorization: "Bearer " + token },
  });
}

// =========Products===========
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

export function updateProduct(id: number, bodyProductUpdate: Product) {
  const token = localStorage.getItem("token")
    ? localStorage.getItem("token")
    : "";
  return client.put(`/products/${id}`, bodyProductUpdate, {
    headers: { Authorization: "Bearer " + token },
  });
}

export function deleteProduct(id: number): Promise<any> {
  const token = localStorage.getItem("token")
    ? localStorage.getItem("token")
    : "";
  return client.delete(`/products/${id}`, {
    headers: { Authorization: "Bearer " + token },
  });
}

export function getProductId(id: number): Promise<any> {
  return client.get(`/products/${id}`);
}
