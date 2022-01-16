interface User {
  id: number;
  email: string;
  password: string;
  token: string;
  phoneNumber: string;
  address: { address: string; city: string };
  avatar: string;
  rules: string[];
}
interface IOrder {
  id: string;
  idUser: string;
  urlImg: string;
  productName: string;
  size: string;
  quantity: number;
  price: number;
  name: string;
  address: string;
  phoneNumber: string;
}
interface State {
  abbreviation: string;
  name: string;
}

interface FormData {
  email: string;
  password: string;
}

interface Product {
  id: number;
  name: string;
  price: number;
  color: number;
  thumbnail: string;
  detailimg: Array[string];
  colorimg: Array[string];
  size: Array[string];
  type: string;
  gender: string;
}

interface CartItem {
  id: string;
  idUser: string;
  urlImg: string;
  productName: string;
  size: string;
  quantity: number;
  price: number;
}

interface UserSettingsStatus {
  nameInput: string;
  message: string;
}

interface BodyCreateUser {
  email: string;
  password: string;
  phoneNumber: string;
  address: { address: string; city: string };
  avatar: string;
}

interface BodyUpdateUser {
  email: string;
  password: string;
  phoneNumber: string;
  address: { address: string; city: string };
  avatar: string;
}

interface AccountSetting {
  newEmail: string;
  newPassword: string;
}
interface UserRole {
  role: string;
}

interface ICheckout {
  name: string;
  address:string;
  city:string;
  phoneNumber:string;
}

interface ICartAdd {
  urlImg: string;
  productName: string;
  size: string;
  price: number;
}