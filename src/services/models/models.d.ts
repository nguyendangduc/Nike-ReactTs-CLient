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
  id: number;
  idUser: number;
  urlImg: string;
  productName: string;
  size: number;
  quantity: number;
  price: number;
}
interface State {
  abbreviation: string;
  name: string;
}
interface Customer {
  id: number;
  firstName: string;
  lastName: string;
  gender: string;
  address: string;
  city: string;
  state: State;
  orders: Order[];
  latitude: number;
  longitude: number;
  orderTotal: number;
}

interface CustomersByPage {
  results: Customer[];
  totalRecords: number;
}

interface FormData {
  email: string;
  password: string;
}

interface Product {
  id: any;
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
  color: string;
  idProduct: number;
  idCart: string;
  name: string;
  price: number;
  size: string;
  quantity: number;
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