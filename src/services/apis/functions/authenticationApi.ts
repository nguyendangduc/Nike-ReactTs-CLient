import axios, { AxiosResponse, AxiosError } from "axios";
import client from '../client'

interface LoginData {
  email: string;
  password: string;
}
interface RegisterData {
  email: string;
  password: string;
}
export function postLogin(loginData: LoginData): Promise<any> {
  return client.post(`/auth/login`, loginData);
}
export function postRegister(registerData: RegisterData): Promise<any> {
  return client.post(`/auth/register`, registerData);
}
export function logout(): Promise<any> {
  const token = localStorage.getItem("token")
    ? localStorage.getItem("token")
    : "";
  return client.post(
    `/auth/logout`,
    {},
    {
      headers: { Authorization: "Bearer " + token },
    }
  );
}

