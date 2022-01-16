import client from "../client";

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
export function authByToken(): Promise<any> {
  const token = localStorage.getItem("token")
    ? localStorage.getItem("token")
    : "";
  return client.post(
    `/auth/authWithToken`,
    { token: token },
    {
      headers: { Authorization: "Bearer " + token },
    }
  );
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

export function updateInfo(id: number, bodyUserUpdate: BodyUpdateUser) {
  const token = localStorage.getItem("token")
    ? localStorage.getItem("token")
    : "";
  return client.put(`/users/${id}`, bodyUserUpdate, {
    headers: { Authorization: "Bearer " + token },
  });
}
