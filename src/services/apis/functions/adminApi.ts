import client from "../client";

export function getUsers(): Promise<any> {
  return client.get("/users");
}

export function getAllProducts(): Promise<any> {
  return client.get("/products");
}
